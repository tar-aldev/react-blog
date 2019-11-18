import React from 'react'
import BlockQuoteNode from '../Nodes/BlockQuoteNode/BlockQuoteNode'

const blockRender = options => {
  const { component, type } = options

  return {
    renderBlock: (props, editor, next) => {
      if (props.node.type === type) {
        return component(props)
      }
      return next()
    }
  }
}

const textLeft = blockRender({
  type: 'text-left',
  component: props => (
    <div style={{ textAlign: 'left' }} {...props.attributes}>
      {props.children}
    </div>
  )
})

const textCenter = blockRender({
  type: 'text-center',
  component: props => (
    <div style={{ textAlign: 'left' }} {...props.attributes}>
      {props.children}
    </div>
  )
})

const textRight = blockRender({
  type: 'text-left',
  component: props => (
    <div style={{ textAlign: 'left' }} {...props.attributes}>
      {props.children}
    </div>
  )
})

const blockQuote = blockRender({
  type: 'blockquote',
  component: props => <BlockQuoteNode {...props} />
})

const orderedList = blockRender({
  type: 'ordered-list',
  component: props => <ol {...props.attributes}>{props.children}</ol>
})

const unorderedList = blockRender({
  type: 'unordered-list',
  component: props => <ul {...props.attributes}>{props.children}</ul>
})

const listItem = blockRender({
  type: 'list-item',
  component: props => <li {...props.attributes}>{props.children}</li>
})

export default [
  textLeft,
  textCenter,
  textRight,
  blockQuote,
  orderedList,
  unorderedList,
  listItem
]
