#!/usr/bin/env python3
import random
import shutil
import string
import subprocess
import sys
from argparse import ArgumentParser
from pathlib import Path
from typing import Dict

SECRETS = {
    'db_root_password': 'Root database password',
    'db_user': 'Database username',
    'db_password': 'Database password',
    'wp_admin_user': 'Wordpress Admin username',
    'wp_admin_password': 'Wordpress Admin password',
    'jwt_auth_key': 'JWT authentication secret key'
}

def random_string(size: int=64, chars: str=string.ascii_letters + string.digits) -> str:
    """
    Generate a random string of `chars` of length `size`
    """
    return ''.join(random.choice(chars) for x in range(size))

def run_cmd(*args, **kwargs):
    """
    Runs a process and defaults output to the std streams
    """
    stdout = kwargs.pop('stdout', sys.stdout)
    stderr = kwargs.pop('stderr', sys.stderr)
    return subprocess.run(*args, **kwargs, stdout=stdout, stderr=stderr)

def get_secrets_interactive() -> Dict[str, str]:
    """
    Prompt the user to enter a value for each secret
    """
    secrets_dict = dict()
    for name, description in SECRETS.items():
        value = input(f"Enter a value for the {description} [{name}] (Leave blank for random):")
        if len(value) > 0:
            secrets_dict[name] = value
        else:
            secrets_dict[name] = random_string()
    return secrets_dict

def create_secrets_files(secrets_dict: Dict[str, str]):
    """
    Create the secrets files from the given secrets dictionary `secrets_dict`
    """
    root_path = Path(__file__).resolve().parent
    secrets_root = root_path / 'secrets'
    if not secrets_root.exists():
        secrets_root.mkdir()
    for secret, value in secrets_dict.items():
        secret_file = secrets_root / f'{secret}.txt'
        with secret_file.open(mode='w') as f:
            f.write(value)
            print(f'Wrote secrets/{secret}.txt')

def create_secrets():
    """
    Prompt the user for secret values and create them
    """
    create_secrets_files(get_secrets_interactive())

def clear_secrets():
    """
    Delete all existing secrets
    """
    root_path = Path(__file__).resolve().parent
    secrets_root = root_path / 'secrets'
    if not secrets_root.exists():
        print('No secrets directory exists')
        return
    
    found = False
    for secret in SECRETS:
        secret_file = secrets_root / f'{secret}.txt'
        if secret_file.exists():
            found = True
            secret_file.unlink()
            print(f'Removed secrets/{secret}.txt')
    
    if not found:
        print('No secrets found')

def check_docker_dotenv():
    """
    Checks to make sure the compose .env exists, and if not, copies the defaults
    """
    root_path = Path(__file__).resolve().parent
    dotenv_path = root_path / '.env'
    if not dotenv_path.exists():
        print('No .env file for compose found, copying .env.defaults to .env')
        defaults_path = root_path / '.env.defaults'
        shutil.copy(str(defaults_path), str(dotenv_path))

def confirm_destroy_all() -> bool:
    """
    Get confirmation that the user really wants to destroy all of the volume data
    """
    confirm = input("Performing this action will irreversibly destroy all data in this instance. Proceed? [y]/[n]: ")
    return confirm.lower() == 'y'

if __name__ == '__main__':
    parser = ArgumentParser(description='Spin up and down the DevGulp application.')
    parser.add_argument('deployment', 
        choices=['dev', 'prod'],
        help='The deployment configuration.')
    parser.add_argument('command', 
        choices=['up', 'down', 'create_secrets', 'clear_secrets', 'destroy'], 
        help='The command to run.')
    args = parser.parse_args()

    if args.deployment == 'dev':
        if args.command == 'up':
            check_docker_dotenv()
            run_cmd(['docker-compose', '-f', 'docker-compose.dev.yml', 'up', '-d', '--build'])
        elif args.command == 'down':
            check_docker_dotenv()
            run_cmd(['docker-compose', '-f', 'docker-compose.dev.yml', 'down'])
        elif args.command == 'create_secrets':
            print("create_secrets must be run in the 'prod' deployment") #invalid
        elif args.command == 'clear_secrets':
            print("clear_secrets must be run in the 'prod' deployment") #invalid
        elif args.command == 'destroy':
            if confirm_destroy_all():
                check_docker_dotenv()
                run_cmd(['docker-compose', '-f', 'docker-compose.dev.yml', 'down', '-v'])
    elif args.deployment == 'prod':
        if args.command == 'up':
            run_cmd(['docker-compose', 'up', '-d', '--build'])
        elif args.command == 'down':
            run_cmd(['docker-compose', 'down'])
        elif args.command == 'create_secrets':
            create_secrets()
        elif args.command == 'clear_secrets':
            clear_secrets()
        elif args.command == 'destroy':
            if confirm_destroy_all():
                run_cmd(['docker-compose', 'down', '-v'])
