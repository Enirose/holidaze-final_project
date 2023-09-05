import React from "react"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/layout"
import { Container } from "react-bootstrap"
import "./styles/custom.scss"
import HomePage from "./pages/home"


export default function App() {

  return (
    <Container>
      <Router>
          <Routes>
            <Route>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage/>} />
              </Route>
            </Route>
          </Routes>
      </Router>
    </Container>
  )
}
