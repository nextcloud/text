import { markdownit, createEditor, createMarkdownSerializer, serializePlainText } from './../EditorFactory';
import spec from "./fixtures/spec"

const markdownToDocument = (markdown) => {
  const tiptap = createEditor({
    content: markdownit.render(markdown),
    enableRichEditing: false
  })
  const serializer = createMarkdownSerializer(tiptap.nodes, tiptap.marks)
  return tiptap.state.doc
}

const plaintextThroughEditor = (markdown) => {
  const content = `<pre>${markdown}</pre>`
  const tiptap = createEditor({
    content: content,
    enableRichEditing: false
  })
  return serializePlainText(tiptap) || ''
}

describe('Commonmark', () => {
  beforeAll(() => {
    // Make sure html tests pass
    // entry.section === 'HTML blocks' || entry.section === 'Raw HTML'
    markdownit.set({ html: true})
  })
  afterAll(() => {
    markdownit.set({ html: false})
  })

  // failures because of some additional newline in markdownit
  const skippedMarkdownTests = [
      181, 202, 203
  ];

  spec.forEach((entry) => {
    if (skippedMarkdownTests.indexOf(entry.example) !== -1) {
      return
    }
    test('commonmark ' + entry.example, () => {
      expect(markdownit.render(entry.markdown)).toBe(entry.html, entry)
    })
  })
})

describe('Markdown though editor', () => {
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
