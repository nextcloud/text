import { markdownit, createEditor, createMarkdownSerializer, serializePlainText } from './../EditorFactory';
import spec from "./fixtures/spec"

const escapeHTML = (s) => {
  return s.toString()
      .split('&').join('&amp;')
      .split('<').join('&lt;')
      .split('>').join('&gt;')
      .split('"').join('&quot;')
      .split('\'').join('&#039;')
}

const plaintextThroughEditor = (markdown) => {
  const content = '<pre>' + escapeHTML(markdown) + '</pre>'
  const tiptap = createEditor({
    content: content,
    enableRichEditing: false
  })
  return serializePlainText(tiptap) || 'failed'
}

describe('Markdown though editor', () => {
  // FIXME: Those two tests currently fail as trailing whitespace seems to be stripped,
  // if it occurs in the first line which is empty otherwise.
  const skippedMarkdownTests = [
    66, 86
  ];

  spec.forEach((entry) => {
    if (skippedMarkdownTests.indexOf(entry.example) !== -1) {
      return
    }
    test('commonmark ' + entry.example, () => {
      expect(plaintextThroughEditor(entry.markdown)).toBe(entry.markdown)
    })
  })

  test('headlines', () => {
    expect(plaintextThroughEditor('# Test')).toBe('# Test')
    expect(plaintextThroughEditor('## Test')).toBe('## Test')
    expect(plaintextThroughEditor('### Test')).toBe('### Test')
    expect(plaintextThroughEditor('#### Test')).toBe('#### Test')
    expect(plaintextThroughEditor('##### Test')).toBe('##### Test')
  })
  test('inline format', () => {
    expect(plaintextThroughEditor('**Test**')).toBe('**Test**')
    expect(plaintextThroughEditor('__Test__')).toBe('__Test__')
    expect(plaintextThroughEditor('_Test_')).toBe('_Test_')
    expect(plaintextThroughEditor('~~Test~~')).toBe('~~Test~~')
  })
  test('ul', () => {
    expect(plaintextThroughEditor('- foo\n- bar')).toBe('- foo\n- bar')
    expect(plaintextThroughEditor('- foo\n\n- bar')).toBe('- foo\n\n- bar')
    expect(plaintextThroughEditor('- foo\n\n\n- bar')).toBe('- foo\n\n\n- bar')
  })
  test('ol', () => {
    expect(plaintextThroughEditor('1. foo\n2. bar')).toBe('1. foo\n2. bar')
  })
  test('paragraph', () => {
    expect(plaintextThroughEditor('foo\nbar\n\nfoobar\n\tfoobar')).toBe('foo\nbar\n\nfoobar\n\tfoobar')
  })
  test('links', () => {
    expect(plaintextThroughEditor('[test](foo)')).toBe('[test](foo)')
  })
  test('images', () => {
    expect(plaintextThroughEditor('![test](foo)')).toBe('![test](foo)')
  })
})
