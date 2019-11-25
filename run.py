#!/usr/bin/env python3
import subprocess
import argparse
import sys

def run_cmd(*args, **kwargs):
    """
    Runs a process and pipes output to the system streams
    """
    return subprocess.run(*args, **kwargs, stdout=sys.stdout, stderr=sys.stderr)

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
            run_cmd('docker-compose -f docker-compose.dev.yml up -d --build'.split(' '))
        elif args.command == 'down':
            run_cmd('docker-compose -f docker-compose.dev.yml down'.split(' '))
        elif args.command == 'create_secrets':
            print("create_secrets must be run in the 'prod' deployment")
        elif args.command == 'clear_secrets':
            print("clear_secrets must be run in the 'prod' deployment")
        elif args.command == 'destroy':
            run_cmd('docker-compose -f docker-compose.dev.yml down -v'.split(' '))
    elif args.deployment == 'prod':
        if args.command == 'up':
            run_cmd('docker-compose up -d --build'.split(' '))
        elif args.command == 'down':
            run_cmd('docker-compose down'.split(' '))
        elif args.command == 'create_secrets':
            pass
        elif args.command == 'clear_secrets':
            pass
        elif args.command == 'destroy':
            run_cmd(['docker-compose down -v'])