import 'braft-editor/dist/index.css'
import React, { useState, useImperativeHandle, useRef } from 'react'
import BraftEditor from 'braft-editor'
import { Wrapper } from './style'

function Compon(props) {
  const { cRef } = props
  const componentRef = useRef()
  const [editorState, setEditorState] = useState(null)
  const handleChange = function(editorState) {
    setEditorState(editorState)
  }

  // 向外暴露方法
  useImperativeHandle(cRef, () => ({
    getValue: () => {
      return editorState
    },
    getText: () => {
      return editorState.toText()
    },
    getHTML: () => {
      return editorState.toHTML()
    },
    setValue: (value) => {
      setEditorState(BraftEditor.createEditorState(value))
    }
  }))

  return (
    <Wrapper>
      <BraftEditor ref={componentRef} value={editorState} onChange={handleChange}/>
    </Wrapper>
  )
}

export default Compon