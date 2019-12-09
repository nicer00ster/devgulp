#!/usr/bin/env python3
import random
import shutil
import string
import subprocess
import sys
from argparse import ArgumentParser
from pathlib import Path
from typing import Dict

class Secret:
    __slots__ = 'name', 'description', 'length'
    def __init__(self, name, length, description=''):
        self.name = name
        self.description = description
        self.length = length

SECRETS = [
    Secret(name='db_root_password', length=32, description='Root database password'),
    Secret(name='db_user', length=32, description='Database username'),
    Secret(name='db_password', length=32, description='Database password'),
    Secret(name='wp_admin_user', length=32, description='Wordpress Admin username'),
    Secret(name='wp_admin_password', length=32, description='Wordpress Admin password'),
    Secret(name='jwt_auth_key', length=64, description='JWT authentication secret key')
]

def random_string(size: int=32, chars: str=string.ascii_letters + string.digits) -> str:
    """
    Generate a random string of `chars` of length `size`
    """
    return ''.join(random.choice(chars) for x in range(size))

def run_cmd(*args, **kwargs) -> subprocess.CompletedProcess:
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
    for secret in SECRETS:
        value = input("Enter a value for the {description} [{name}] (Leave blank for random):".format(description=secret.description, name=secret.name))
        if len(value) > 0:
            secrets_dict[secret.name] = value
        else:
            secrets_dict[secret.name] = random_string(secret.length)
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
        secret_filename = '{}.txt'.format(secret)
        secret_file = secrets_root / secret_filename
        with secret_file.open(mode='w') as f:
            f.write(value)
            print('Wrote secrets/{}'.format(secret_filename))

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
        secret_filename = '{}.txt'.format(secret.name)
        secret_file = secrets_root / secret_filename
        if secret_file.exists():
            found = True
            secret_file.unlink()
            print('Removed secrets/{}.txt'.format(secret_filename))
    
    if not found:
        print('No secrets found')

def generate_dhparam():
    root_path = Path(__file__).resolve().parent
    run_cmd(['docker', 'run', '--rm', '-v', '{}:/export'.format(root_path), 'frapsoft/openssl', 'dhparam', '-out', '/export/dhparam.pem', '4096'])
    dhparam_file = root_path / 'dhparam.pem'
    if dhparam_file.exists():
        proxy_dhparam_path = root_path / 'proxy' / 'dhparam.pem'
        shutil.move(str(dhparam_file), str(proxy_dhparam_path))
        print('Generated 4096 bit dhparam')
    else:
        print('dhparam generation failed')

def check_docker_dotenv():
    """
    Checks to make sure the compose .env exists, and if not, copies the defaults
    """
    root_path = Path(__file__).resolve().parent
    dotenv_path = root_path / '.env'
    if not dotenv_path.exists():
        print('**No .env file for compose found, copying .env.defaults to .env**')
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
        choices=['up', 'down', 'create_secrets', 'clear_secrets', 'generate_dhparam', 'destroy'], 
        help='The command to run.')
    args = parser.parse_args()

    if args.deployment == 'dev':
        if args.command == 'up':
            check_docker_dotenv()
            run_cmd(['docker-compose', '-f', 'docker-compose.dev.yml', 'up', '-d', '--build'])
        elif args.command == 'down':
            check_docker_dotenv()
            run_cmd(['docker-compose', '-f', 'docker-compose.dev.yml', 'down'])
        elif args.command in ['create_secrets', 'clear_secrets', 'generate_dhparam']:
            print("{} must be run in the 'prod' deployment".format(args.command)) #invalid
        elif args.command == 'destroy':
            if confirm_destroy_all():
                check_docker_dotenv()
                run_cmd(['docker-compose', '-f', 'docker-compose.dev.yml', 'down', '-v'])
    elif args.deployment == 'prod':
        if args.command == 'up':
            check_docker_dotenv()
            run_cmd(['docker-compose', 'up', '-d', '--build'])
        elif args.command == 'down':
            check_docker_dotenv()
            run_cmd(['docker-compose', 'down'])
        elif args.command == 'create_secrets':
            create_secrets()
        elif args.command == 'clear_secrets':
            clear_secrets()
        elif args.command == 'generate_dhparam':
            generate_dhparam()
        elif args.command == 'destroy':
            if confirm_destroy_all():
                check_docker_dotenv()
                run_cmd(['docker-compose', 'down', '-v'])
