import React, { useState, useRef, useEffect } from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from 'draft-js'
import 'draft-js/dist/Draft.css'
import { Card } from 'react-bootstrap'
import classes from './AddPost.module.scss'
import clsx from 'clsx'
import { EditorControls } from './EditorControls/EditorControls'

export const AddPost = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const editorRef = useRef({})

  useEffect(() => {
    editorRef.current.focus()
  }, [])

  const handleChange = editorState => {
    setEditorState(editorState)
  }

  const handleKeyCommand = (command, newEditorState) => {
    console.log('command', command)
    const newState = RichUtils.handleKeyCommand(newEditorState, command)

    if (newState) {
      handleChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const convert = () => {
    const raw = convertToRaw(editorState.getCurrentContent())
    const unpacked = convertFromRaw(raw)
    console.log('RAW', raw, 'unpacked', unpacked)
  }

  const blockStyleCustomizer = contentBlock => {
    console.log('block style customizer')
    console.log('contentBlock.getType()', contentBlock.getType())
    const blockType = contentBlock.getType()

    switch (blockType) {
      case 'blockquote':
        return classes.qoutedText
      case 'code-block':
        return classes.codeBlock
      case 'textLeft':
      case 'textCenter':
      case 'textRight':
        return classes[blockType]
      default:
        return ''
    }
  }

  return (
    <div className='py-4'>
      <h6>Write your own post</h6>
      <Card style={{ height: '80%' }}>
        <Card.Body className='p-0'>
          <div className={clsx(classes.editor, 'p-2')}>
            <EditorControls
              editorState={editorState}
              handleChange={handleChange}
              editorRef={editorRef}
            />
            <hr className='my-1 bg-info' />
            <Editor
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={handleChange}
              blockStyleFn={blockStyleCustomizer}
              ref={editorRef}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
