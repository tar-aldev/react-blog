import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import clsx from 'clsx'
import { RichUtils } from 'draft-js'

import classes from './EditorControls.module.scss'

const TEXT_CONTROLS_LIST = [
  {
    value: 'BOLD', // what is passed to RichUtils.toggleInlineStyle
    icon: 'fas fa-bold'
  },
  {
    value: 'ITALIC',
    icon: 'fas fa-italic'
  },
  {
    value: 'UNDERLINE',
    icon: 'fas fa-underline'
  },
  {
    value: 'STRIKETHROUGH',
    icon: 'fas fa-strikethrough'
  }
]

const BLOCK_TYPES_LIST = [
  {
    value: 'textLeft',
    icon: 'fas fa-align-left'
  },
  {
    value: 'textCenter',
    icon: 'fas fa-align-center'
  },
  {
    value: 'textRight',
    icon: 'fas fa-align-right'
  },
  {
    value: 'blockquote',
    icon: 'fas fa-quote-left'
  },
  {
    value: 'code-block',
    icon: 'fas fa-code'
  }
]

const FONT_SIZES = [
  {
    value: 'unstyled',
    label: 'Normal'
  },
  {
    value: 'header-five',
    label: 'Subtitle'
  },
  {
    value: 'header-three',
    label: 'Title'
  }
]

export const EditorControls = ({
  getStyles,
  handleChange,
  editorState,
  editorRef
}) => {
  const [menuShown, setMenuShown] = useState(false)
  const selection = editorState.getSelection()

  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  const fontSize = FONT_SIZES.find(fontSize => fontSize.value === blockType)
  const currentInlineStyles = editorState.getCurrentInlineStyle()

  const toggleFontsMenu = e => {
    e.preventDefault()
    setMenuShown(!menuShown)
  }

  const preventDefault = (action, ...args) => e => {
    e.preventDefault()
    if (action) {
      action(...args)
    }
  }

  const toggleBlock = value => {
    handleChange(RichUtils.toggleBlockType(editorState, value))
  }

  const toggleInlineStyle = value => {
    handleChange(RichUtils.toggleInlineStyle(editorState, value))
  }

  const toggleFontSize = value => {
    console.log(value, 'font size', editorRef.current)
    handleChange(RichUtils.toggleBlockType(editorState, value))
    setMenuShown(false)
  }

  /* ***BUG*** when toolbar button is clicked and editor is not focused styling is not applied */
  return (
    <div className={classes.controls}>
      {TEXT_CONTROLS_LIST.map(control => (
        <Button
          key={`${control.value}-${control.icon}`}
          variant='outline-light'
          size='sm'
          onMouseDown={preventDefault(toggleInlineStyle, control.value)}
          className={clsx(
            classes.controlBtn,
            currentInlineStyles.has(control.value) && classes.highlight
          )}
        >
          <i className={control.icon} />
        </Button>
      ))}

      <div className={clsx(classes.verticalDivider, 'bg-white mx-1')} />

      {BLOCK_TYPES_LIST.map(blockTypeControl => (
        <Button
          key={`${blockTypeControl.value}-${blockTypeControl.icon}`}
          variant='outline-light'
          size='sm'
          onMouseDown={preventDefault(toggleBlock, blockTypeControl.value)}
          className={clsx(
            classes.controlBtn,
            blockTypeControl.value === blockType && classes.highlight
          )}
        >
          <i className={blockTypeControl.icon} />
        </Button>
      ))}

      <div
        className={classes.customSelectWrapper}
        onMouseLeave={preventDefault(setMenuShown, false)}
      >
        <Button
          variant='outline-light'
          size='sm'
          className={clsx(
            classes.controlBtn,
            'd-flex w-100 justify-content-between'
          )}
          onMouseDown={preventDefault(null)}
          onMouseEnter={toggleFontsMenu}
        >
          <span className='d-block'>
            {fontSize ? fontSize.label : `Normal`}
          </span>
          <i className='fas fa-sort-down' />
        </Button>
        {menuShown && (
          <div className={classes.selectMenu}>
            {FONT_SIZES.map(font => (
              <Button
                key={font.value}
                variant='outline-light'
                size='sm'
                className={classes.controlBtn}
                onMouseDown={preventDefault(toggleFontSize, font.value)}
              >
                {font.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
