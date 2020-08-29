import React from 'react'
import classNames from 'classnames'
// 给自己挖了个坑，用起来才发现styled-components有点局限，todo
import './style.css'

function MyButton(props) {
  const { href, type, children, size, disabled, onClick, className, ...resetProps } = props
  const classes = classNames('btn', `btn-${type}`, `btn-size-${size}`, className)

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...resetProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...resetProps}
        onClick={onClick ? onClick : () => {}}
      >
        {children}
      </button>
    )
  }
}

MyButton.defaultProps = {
  type: 'normal',
  size: 'normal',
  disabled: false,
  href: ''
}

export default MyButton