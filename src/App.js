import React from 'react'
import 'assets/style/normalize.css'
import { renderRoutes } from 'react-router-config'
import { HashRouter as Router } from 'react-router-dom'
import routes from './routes'
import 'assets/svg'

function App() {
  return (
    <Router>
      { renderRoutes(routes) }
    </Router>
  )
}


export default App