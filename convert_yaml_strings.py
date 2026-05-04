"""
Convert scene YAML files to the standard text format:
  - All string values use |- block scalars (no quoting, no escaping)
  - Each list item = one paragraph (strings with blank lines are split into multiple items)
  - if/else blocks with multi-paragraph content are flagged as warnings (too risky to auto-split)

Usage:
    python convert_yaml_strings.py              # dry run — show what would change + warnings
    python convert_yaml_strings.py --write      # write changes in place
    python convert_yaml_strings.py --story demo # one story only
"""

import argparse
import sys
from io import StringIO
from pathlib import Path
from ruamel.yaml import YAML
from ruamel.yaml.scalarstring import LiteralScalarString

TEXT_KEYS = {"text", "else", "failed_text", "journal"}

STRUCTURAL_KEYS = {
    "id", "next", "requires", "effects", "hide_if_failed", "if",
    "flags", "flags_unset", "stats", "weight", "scene",
}

IDENTIFIER_LIST_KEYS = {"flags", "flags_unset"}

warnings = []


def warn(path, msg):
    warnings.append(f"  WARN {path.name}: {msg}")


def to_literal(value):
    """Wrap a string in LiteralScalarString so ruamel emits it as |-."""
    if isinstance(value, str) and not isinstance(value, LiteralScalarString):
        return LiteralScalarString(value.rstrip("\n"))
    return value


def split_paragraphs(text):
    """Split a string on blank lines into a list of LiteralScalarStrings."""
    parts = [p.strip() for p in text.split("\n\n")]
    return [LiteralScalarString(p) for p in parts if p]


def convert_node(node, parent_key=None, path=None):
    """Recursively convert text strings to |- and split multi-paragraph bare list items."""
    if isinstance(node, dict):
        for key in list(node.keys()):
            val = node[key]
            if key in TEXT_KEYS and isinstance(val, str):
                if "\n\n" in val:
                    # Multi-paragraph inside if/else — flag for manual fix
                    warn(path, f"multi-paragraph '{key}' in conditional block — split manually")
                node[key] = to_literal(val)
            else:
                convert_node(val, parent_key=key, path=path)

    elif isinstance(node, list):
        if parent_key in IDENTIFIER_LIST_KEYS:
            return

        i = 0
        while i < len(node):
            item = node[i]

            if isinstance(item, str):
                if "\n\n" in item:
                    # Split bare narrator paragraph into multiple list items
                    parts = split_paragraphs(item)
                    node[i:i+1] = parts
                    i += len(parts)
                else:
                    node[i] = to_literal(item)
                    i += 1

            elif isinstance(item, dict):
                for key in list(item.keys()):
                    val = item[key]
                    if key in TEXT_KEYS and isinstance(val, str):
                        if "\n\n" in val:
                            warn(path, f"multi-paragraph '{key}' in conditional block — split manually")
                        item[key] = to_literal(val)
                    elif key not in STRUCTURAL_KEYS and isinstance(val, str):
                        # voice-prefixed dialogue line
                        if "\n\n" in val:
                            warn(path, f"multi-paragraph voice line '{key}' — split manually")
                        item[key] = to_literal(val)
                    else:
                        convert_node(val, parent_key=key, path=path)
                i += 1

            else:
                convert_node(item, path=path)
                i += 1


def process_file(path: Path, write: bool, yaml: YAML) -> bool:
    """Parse, convert, and optionally write a single YAML file. Returns True if changed."""
    original = path.read_text(encoding="utf-8")

    data = yaml.load(original)
    if data is None:
        return False

    convert_node(data, path=path)

    buf = StringIO()
    yaml.dump(data, buf)
    result = buf.getvalue()

    if result == original:
        return False

    if write:
        path.write_text(result, encoding="utf-8")
    else:
        print(f"  would change: {path.relative_to(Path(__file__).parent)}")

    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="Write changes in place")
    parser.add_argument("--story", help="Limit to a single story ID")
    args = parser.parse_args()

    root = Path(__file__).parent / "stories"
    if args.story:
        search_root = root / args.story
        if not search_root.exists():
            print(f"Story not found: {args.story}", file=sys.stderr)
            sys.exit(1)
    else:
        search_root = root

    yaml = YAML()
    yaml.preserve_quotes = False
    yaml.default_flow_style = False
    yaml.width = 4096  # don't wrap long lines — block scalars are literal

    files = sorted(search_root.rglob("*.yaml"))
    changed = 0
    for f in files:
        if process_file(f, args.write, yaml):
            changed += 1
            if args.write:
                print(f"  converted: {f.relative_to(Path(__file__).parent)}")

    action = "converted" if args.write else "would change"
    print(f"\n{changed} / {len(files)} files {action}.")
    if not args.write and changed:
        print("Run with --write to apply.")

    if warnings:
        print(f"\n{len(warnings)} manual fix(es) needed:")
        for w in warnings:
            print(w)


if __name__ == "__main__":
    main()
