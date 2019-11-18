import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from 'shared/components/Layout/Layout'
import AppRouter from './AppRouter'
import Navbar from 'shared/components/Navbar/Navbar'
import { RightPanel } from 'shared/components/RightPanel/RightPanel'

function App () {
  return (
    <Layout>
      <Router>
        <Navbar />
        <AppRouter />
        {/* <RightPanel /> */}
      </Router>
    </Layout>
  )
}

export default App
