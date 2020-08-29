import React from 'react'
import ReactDom from 'react-dom'
import { DialogMask, DialogContainer, DialogBody, DialogTitle } from './style.js'
import SvgIcon from '@/components/SvgIcon'

function MyDialog(props) {
  const { visible, children, onClose, title, mask } = props

  if (!visible) return null
  
  const child = (
      <DialogContainer>
        {mask ? <DialogMask onClick={onClose}/> : null}
        <DialogBody>
          <DialogTitle>
            {title ? <h3>{title}</h3> : null}
            <SvgIcon onClick={onClose} className="icon" iconClass="close"></SvgIcon>
          </DialogTitle>
          {children}
        </DialogBody>
      </DialogContainer>
  )
  
  return (
    ReactDom.createPortal(child, document.body)
  )
}

MyDialog.defaultProps = {
  visible: false,
  mask: true
}

// todo：对外暴露便捷接口
export const alert = () => {}
export const confirm = () => {}

export default MyDialog