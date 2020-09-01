import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Wrapper } from './style'
export default class PageDemo extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState(null)
  }

  render () {
    return (
      <Wrapper>
        <BraftEditor value={this.state.editorState} onChange={this.handleChange}/>
      </Wrapper>
    )
  }

  handleChange = (editorState) => {
    this.setState({ editorState })
  }

}