import React from 'react'

const FontSizeNode = props => {
  const fontSize = props.mark.getIn(['data', 'fontSize'])
  console.log('fontSize', fontSize)
  return (
    <span {...props.attributes} style={{ fontSize: `${fontSize}px` }}>
      {props.children}
    </span>
  )
}

export default FontSizeNode
