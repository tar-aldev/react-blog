const markHotKey = options => {
  const { type, key } = options

  return {
    onKeyDown: (event, editor, next) => {
      if (!event.ctrlKey || event.key !== key) return next()

      event.preventDefault()
      editor.toggleMark(type)
    }
  }
}

const blockHotKey = options => {
  const { type, key } = options

  return {
    onKeyDown: (event, editor, next) => {
      if (!event.ctrlKey || event.key !== key) return next()

      event.preventDefault()

      /* Check if block already has styling */
      const isBlockStyled = editor.value.blocks.some(
        block => block.type === type
      )
      event.preventDefault()
      editor.setBlocks(isBlockStyled ? 'paragraph' : type)
    }
  }
}

const bold = markHotKey({ type: 'bold', key: 'b' })
const italic = markHotKey({ type: 'italic', key: 'i' })
const underline = markHotKey({ type: 'underlined', key: 'u' })
const code = markHotKey({ type: 'code', key: '`' })

const quote = blockHotKey({ type: 'blockquote', key: 'q' })

export default [bold, italic, underline, code, quote]
