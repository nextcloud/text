#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Nextcloud contributors
# SPDX-License-Identifier: AGPL-3.0-or-later
"""Generate compatibility metadata alongside a built Text deployment."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import tempfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


def manifest_for(source, revision):
    if not re.fullmatch(r'[a-f0-9]{40}', revision):
        raise ValueError('Expected a full lowercase Git source revision')
    version = ET.parse(source / 'appinfo/info.xml').getroot().findtext('version')
    if not version:
        raise ValueError('Text app version is missing')
    fingerprints = {}
    for folder in ['js', 'css', 'lib', 'appinfo', 'composer/composer']:
        for file in sorted((source / folder).rglob('*')):
            if file.is_file() and file.suffix in ['.mjs', '.css', '.php', '.xml']:
                fingerprints[str(file.relative_to(source))] = hashlib.sha256(file.read_bytes()).hexdigest()
    encoded = json.dumps(fingerprints, sort_keys=True, separators=(',', ':')).encode()
    return dict(format=1, textVersion=version, sourceRevision=revision,
                codeDigest=hashlib.sha256(encoded).hexdigest(),
                sessionAPI='context-v1', updateEncoding='yjs-sync-v1')


def write_manifest(source, revision):
    manifest = manifest_for(source, revision)
    target = source / 'js/native-embedding.json'
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', dir=target.parent, delete=False) as output:
            temporary = Path(output.name)
            output.write(json.dumps(manifest, indent=2) + '\n')
        temporary.chmod(0o644)
        os.replace(temporary, target)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)
    return manifest


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-revision', required=True)
    args = parser.parse_args()
    write_manifest(ROOT, args.source_revision)
