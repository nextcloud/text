# SPDX-FileCopyrightText: 2026 Nextcloud contributors
# SPDX-License-Identifier: AGPL-3.0-or-later
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('native_embedding',
    Path(__file__).resolve().parents[2] / 'tools/native-embedding.py')
embedding = importlib.util.module_from_spec(spec)
spec.loader.exec_module(embedding)


class ManifestBuildTest(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        for folder in ['appinfo', 'js', 'css', 'lib', 'composer/composer']:
            (self.root / folder).mkdir(parents=True)
        (self.root / 'appinfo/info.xml').write_text('<info><version>10.0.0-dev.3</version></info>')
        (self.root / 'js/editor.mjs').write_text('export const editor = true;')
        self.revision = 'a' * 40

    def test_repeated_generation_is_identical_and_excludes_its_output(self):
        first = embedding.write_manifest(self.root, self.revision)
        before = (self.root / 'js/native-embedding.json').read_bytes()
        self.assertEqual(first, embedding.write_manifest(self.root, self.revision))
        self.assertEqual(before, (self.root / 'js/native-embedding.json').read_bytes())
        self.assertEqual(0o644, (self.root / 'js/native-embedding.json').stat().st_mode & 0o777)

    def test_changed_deployed_code_changes_the_digest(self):
        first = embedding.manifest_for(self.root, self.revision)
        (self.root / 'lib/Service.php').write_text('<?php class Service {}')
        self.assertNotEqual(first['codeDigest'], embedding.manifest_for(self.root, self.revision)['codeDigest'])

    def test_source_revision_and_version_describe_the_deployment(self):
        manifest = embedding.manifest_for(self.root, 'b' * 40)
        self.assertEqual('b' * 40, manifest['sourceRevision'])
        self.assertEqual('10.0.0-dev.3', manifest['textVersion'])
        (self.root / 'appinfo/info.xml').write_text('<info/>')
        with self.assertRaises(ValueError):
            embedding.manifest_for(self.root, self.revision)

    def test_invalid_revision_is_rejected(self):
        for revision in ['main', '../other', 'A' * 40, 'a' * 39]:
            with self.assertRaises(ValueError):
                embedding.manifest_for(self.root, revision)


if __name__ == '__main__':
    unittest.main()
