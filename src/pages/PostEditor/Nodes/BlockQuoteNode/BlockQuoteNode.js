import React from 'react'
import PropTypes from 'prop-types'
import classes from './BlockQuoteNode.module.scss'

const BlockQuoteNode = props => {
  console.log('render block quote')
  return (
    <blockquote {...props.attributes} className={classes.root}>
      {props.children}
    </blockquote>
  )
}

BlockQuoteNode.propTypes = {}

export default BlockQuoteNode
