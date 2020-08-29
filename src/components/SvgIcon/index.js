import React from 'react'
import './style.css'
import classNames from 'classnames'

function SvgIcon (props) {
  const { iconClass, fill, className, onClick } = props;
  const classes = classNames('svg-class', className)
  return (
    <svg className={classes} onClick={onClick}>
      <use xlinkHref={"#icon-" + iconClass} fill={fill} />
    </svg>
  )
}

export default SvgIcon