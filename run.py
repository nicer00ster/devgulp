#!/usr/bin/env python3
import argparse
import os
import random
import string
import subprocess
import sys
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
    Runs a process and pipes output to the std streams
    """
    stdout = kwargs.pop('stdout', sys.stdout)
    stderr = kwargs.pop('stderr', sys.stderr)
    return subprocess.run(*args, **kwargs, stdout=stdout, stderr=stderr)

def create_secrets_interactive() -> Dict[str, str]:
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
    pass

def create_secrets():
    [print(f'{x}: {y}') for x,y in create_secrets_interactive().items()]

def clear_secrets():
    """
    Delete all existing secrets
    """
    secrets_root = Path(os.path.abspath(__file__)) / 'secrets'
    if not secrets_root.exists():
        print('No secrets directory exists')
        return
    
    for secret in SECRETS:
        os.remove(secrets_root / f'{secret}.txt')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Spin up and down the DevGulp application.')
    parser.add_argument('deployment', 
        choices=['dev', 'prod'],
        help='The deployment configuration.')
    parser.add_argument('command', 
        choices=['up', 'down', 'create_secrets', 'clear_secrets', 'destroy'], 
        help='The command to run.')
    args = parser.parse_args()

    if args.deployment == 'dev':
        if args.command == 'up':
            run_cmd(['docker-compose', '-f', 'docker-compose.dev.yml', 'up', '-d', '--build'])
        elif args.command == 'down':
            run_cmd(['docker-compose', '-f', 'docker-compose.dev.yml', 'down'])
        elif args.command == 'create_secrets':
            print("create_secrets must be run in the 'prod' deployment") #invalid
        elif args.command == 'clear_secrets':
            print("clear_secrets must be run in the 'prod' deployment") #invalid
        elif args.command == 'destroy':
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
            run_cmd(['docker-compose', 'down', '-v'])
