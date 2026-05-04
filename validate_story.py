#!/usr/bin/env python3
"""
Validate gamebook story YAML files.

Usage:
    python validate_story.py <story-id>
    python validate_story.py <story-id> 4
"""

import sys
import os
import yaml
from pathlib import Path


def load_yaml(path):
    with open(path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


class Validator:
    def __init__(self, story_id):
        self.story_id = story_id
        self.story_dir = Path('stories') / story_id
        self.scenes_dir = self.story_dir / 'scenes'
        self.errors = []
        self.warnings = []
        self.story_meta = {}

    def error(self, location, message):
        self.errors.append(f"ERROR  {location}  {message}")

    def warn(self, location, message):
        self.warnings.append(f"WARN   {location}  {message}")

    def validate_story_yaml(self):
        path = self.story_dir / 'story.yaml'
        if not path.exists():
            self.error('story.yaml', 'file not found')
            return False

        data = load_yaml(path)
        if data is None:
            self.error('story.yaml', 'file is empty or invalid YAML')
            return False

        for field in ('id', 'title', 'start'):
            if field not in data:
                self.error('story.yaml', f'missing required field: {field}')

        if 'stats' in data and data['stats']:
            for k, v in data['stats'].items():
                if not isinstance(v, (int, float)):
                    self.error('story.yaml', f'stat "{k}" value must be numeric, got {repr(v)}')

        if 'start' in data:
            start_scene = data['start']
            start_path = self.scenes_dir / (start_scene.replace('/', os.sep) + '.yaml')
            if not start_path.exists():
                self.error('story.yaml', f'start scene "{start_scene}" file not found: {start_path}')

        self.story_meta = data
        return len(self.errors) == 0

    def run(self):
        if not self.story_dir.exists():
            print(f"ERROR  story  directory not found: {self.story_dir}")
            return 1

        self.validate_story_yaml()
        self.print_results()
        return 1 if self.errors else 0

    def print_results(self):
        all_messages = self.errors + self.warnings
        for msg in all_messages:
            print(msg)
        error_count = len(self.errors)
        warn_count = len(self.warnings)
        if error_count == 0 and warn_count == 0:
            print("All checks passed.")
        else:
            parts = []
            if error_count:
                parts.append(f"{error_count} error{'s' if error_count != 1 else ''}")
            if warn_count:
                parts.append(f"{warn_count} warning{'s' if warn_count != 1 else ''}")
            print(', '.join(parts))


def main():
    if len(sys.argv) < 2:
        print("Usage: python validate_story.py <story-id> [stage]")
        sys.exit(1)
    story_id = sys.argv[1]
    # stage arg accepted but only stage 4 is validated — all checks always run
    validator = Validator(story_id)
    sys.exit(validator.run())


if __name__ == '__main__':
    main()
