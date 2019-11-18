import React, { useState, useEffect, useMemo } from 'react'
import { Button } from 'react-bootstrap'
import clsx from 'clsx'
import { RichUtils } from 'draft-js'

import classes from './EditorControls.module.scss'

const TEXT_STYLE_BUTTONS = [
  {
    value: 'bold',
    icon: 'fas fa-bold'
  },
  {
    value: 'italic',
    icon: 'fas fa-italic'
  },
  {
    value: 'underlined',
    icon: 'fas fa-underline'
  },
  {
    value: 'code',
    icon: 'fas fa-code'
  }
]

const BLOCK_TRANSFORM_BUTTONS = [
  {
    value: 'text-left',
    icon: 'fas fa-align-left'
  },
  {
    value: 'text-center',
    icon: 'fas fa-align-center'
  },
  {
    value: 'text-right',
    icon: 'fas fa-align-right'
  },
  {
    value: 'blockquote',
    icon: 'fas fa-quote-left'
  }
]

const LISTS_BUTTONS = [
  {
    value: 'unordered-list',
    icon: 'fas fa-list-ul'
  },
  {
    value: 'ordered-list',
    icon: 'fas fa-list-ol'
  }
]

const FONT_SIZES = Array.from(new Array(30).keys()).filter(
  fontSize => fontSize > 10 && fontSize % 2 === 0
)

export const EditorControls = ({ editorRef }) => {
  const [menuShown, setMenuShown] = useState(false)

  const getFontSize = () => {
    if (Object.keys(editorRef.current).length > 0) {
      const mark = editorRef.current.value.marks.find(
        mark => mark.type === 'font-size'
      )
      if (mark) {
        return mark.getIn(['data', 'fontSize'])
      }
      return 16
    }
  }

  console.log(getFontSize())
  const preventDefault = (action, ...args) => e => {
    e.preventDefault()
    action(...args)
  }

  const toggleFontsMenu = () => {
    setMenuShown(!menuShown)
  }

  const toggleMarkType = markType => {
    editorRef.current.toggleMark(markType)
  }

  const toggleBlockType = blockType => {
    editorRef.current.setBlocks(
      isBlockTypeSelected(blockType) ? 'paragraph' : blockType
    )
  }

  const isBlockTypeSelected = blockType => {
    if (editorRef.current.value) {
      if (['ordered-list', 'unordered-list'].includes(blockType)) {
        const {
          value: { document, blocks }
        } = editorRef.current

        if (blocks.size > 0) {
          const parent = document.getParent(blocks.first().key)
          return hasBlock('list-item') && parent && parent.type === blockType
        }
      }

      return hasBlock(blockType)
    }
    return false
  }

  const isMarkTypeSelected = markType => {
    if (editorRef.current.value) {
      return editorRef.current.value.marks.some(mark => mark.type === markType)
    }
    return false
  }

  const changeFontSize = fontSize => {
    editorRef.current.value.marks.forEach(mark => {
      if (mark.type === 'font-size') {
        editorRef.current.removeMark(mark)
      }
    })
    editorRef.current.addMark({
      type: 'font-size',
      data: { fontSize: fontSize }
    })
  }

  const hasBlock = type => {
    const { value } = editorRef.current
    return value.blocks.some(node => node.type === type)
  }

  const toggleLists = listType => {
    const { value } = editorRef.current

    const isList = hasBlock('list-item')
    const isType = value.blocks.some(block => {
      return !!value.document.getClosest(
        block.key,
        parent => parent.type === listType
      )
    })
    if (isList && isType) {
      return editorRef.current
        .setBlocks('paragraph')
        .unwrapBlock('unordered-list')
        .unwrapBlock('ordered-list')
    }

    if (isList) {
      return editorRef.current
        .unwrapBlock(
          listType === 'unordered-list' ? 'ordered-list' : 'unordered-list'
        )
        .wrapBlock(listType)
    }
    editorRef.current.setBlocks('list-item').wrapBlock(listType)
  }

  return (
    <div className={classes.controls}>
      <div>
        {TEXT_STYLE_BUTTONS.map(textStyleBtn => (
          <Button
            key={textStyleBtn.value}
            size='sm'
            variant='outline-light'
            className={clsx(
              classes.controlBtn,
              isMarkTypeSelected(textStyleBtn.value) && classes.highlight
            )}
            onPointerDown={preventDefault(toggleMarkType, textStyleBtn.value)}
          >
            <i className={textStyleBtn.icon} />
          </Button>
        ))}
      </div>
      <div>
        {BLOCK_TRANSFORM_BUTTONS.map(textAlignBtn => (
          <Button
            key={textAlignBtn.value}
            size='sm'
            variant='outline-light'
            className={clsx(
              classes.controlBtn,
              isBlockTypeSelected(textAlignBtn.value) && classes.highlight
            )}
            onPointerDown={preventDefault(toggleBlockType, textAlignBtn.value)}
          >
            <i className={textAlignBtn.icon} />
          </Button>
        ))}
      </div>
      <div
        className={classes.customSelectWrapper}
        onMouseLeave={preventDefault(setMenuShown, false)}
      >
        <Button
          variant='outline-light'
          size='sm'
          className={clsx(classes.controlBtn, 'd-flex w-100 px-2')}
          onMouseEnter={preventDefault(setMenuShown, true)}
          onMouseDown={preventDefault(toggleFontsMenu)}
        >
          <span className='mr-2'>{getFontSize()}</span>
          <i className='fas fa-sort-down' />
        </Button>
        {menuShown && (
          <div className={classes.selectMenu}>
            {FONT_SIZES.map(font => (
              <Button
                key={font}
                variant='outline-light'
                size='sm'
                className={classes.controlBtn}
                onMouseDown={preventDefault(changeFontSize, font)}
              >
                {font}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div>
        {LISTS_BUTTONS.map(listButton => (
          <Button
            key={listButton.value}
            size='sm'
            variant='outline-light'
            className={clsx(
              classes.controlBtn,
              isBlockTypeSelected(listButton.value) && classes.highlight
            )}
            onPointerDown={preventDefault(toggleLists, listButton.value)}
          >
            <i className={listButton.icon} />
          </Button>
        ))}
      </div>
    </div>
  )
}
