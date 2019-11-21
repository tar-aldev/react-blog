import React from 'react'

const CodeNode = props => {
  return (
    <code {...props.attributes} className='bg-dark text-white text-small px-1'>
      {props.children}
    </code>
  )
}

export default CodeNode
