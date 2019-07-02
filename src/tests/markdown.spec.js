import { markdownit, createEditor, createMarkdownSerializer } from './../EditorFactory';
import spec from "./fixtures/spec"

const markdownThroughEditor = (markdown) => {
  const tiptap = createEditor({
    content: markdownit.render(markdown),
    enableRichEditing: true
  })
  const serializer = createMarkdownSerializer(tiptap.nodes, tiptap.marks)
  return serializer.serialize(tiptap.state.doc)
}

const markdownThroughEditorHtml = (html) => {
  const tiptap = createEditor({
    content: html,
    enableRichEditing: true
  })
  const serializer = createMarkdownSerializer(tiptap.nodes, tiptap.marks)
  return serializer.serialize(tiptap.state.doc)
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
    expect(markdownThroughEditor('# Test')).toBe('# Test')
    expect(markdownThroughEditor('## Test')).toBe('## Test')
    expect(markdownThroughEditor('### Test')).toBe('### Test')
    expect(markdownThroughEditor('#### Test')).toBe('#### Test')
    expect(markdownThroughEditor('##### Test')).toBe('##### Test')
  })
  test('inline format', () => {
    expect(markdownThroughEditor('**Test**')).toBe('**Test**')
    expect(markdownThroughEditor('__Test__')).toBe('**Test**')
    expect(markdownThroughEditor('_Test_')).toBe('*Test*')
    expect(markdownThroughEditor('~~Test~~')).toBe('~~Test~~')
  })
  test('ul', () => {
    expect(markdownThroughEditor('- foo\n- bar')).toBe('* foo\n\n* bar')
    expect(markdownThroughEditor('- foo\n\n- bar')).toBe('* foo\n\n* bar')
    expect(markdownThroughEditor('- foo\n\n\n- bar')).toBe('* foo\n\n* bar')
  })
  test('ol', () => {
    expect(markdownThroughEditor('1. foo\n2. bar')).toBe('1. foo\n\n2. bar')
  })
  test('paragraph', () => {
    expect(markdownThroughEditor('foo\nbar\n\nfoobar\n\tfoobar')).toBe('foo bar\n\nfoobar foobar')
  })
  test('links', () => {
    expect(markdownThroughEditor('[test](foo)')).toBe('[test](foo)')
  })
  test('images', () => {
    expect(markdownThroughEditor('![test](foo)')).toBe('![test](foo)')
  })
  test('special characters', () => {
    expect(markdownThroughEditor('"\';&.-#><')).toBe('"\';&.-#><')
  })
})

describe('Markdown serializer from html', () => {
  test('paragraph', () => {
    expect(markdownThroughEditorHtml('<p>hello</p><p>world</p>')).toBe('hello\n\nworld')
  })
  test('links', () => {
    expect(markdownThroughEditorHtml('<a href="foo">test</a>')).toBe('[test](foo)')
  })
  test('images', () => {
    expect(markdownThroughEditorHtml('<img src="image" alt="description" />')).toBe('![description](image)')
  })
})
