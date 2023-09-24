import React from "react"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/layout"
import { Container } from "react-bootstrap"
import "./styles/custom.scss"
import HomePage from "./pages/home"
import SpecificVenue from "./pages/venue";
import RegisterListener from "./pages/register";
import LoginPage from "./pages/login"
import UserProfile from "./pages/profile"
import CreateVenueForm from "./pages/profile/create"
import EditVenueFormListener from "./pages/profile/edit"


export default function App() {

  return (
    <Container>
      <Router>
          <Routes>
            <Route>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage/>} />
                <Route path="/register" element={<RegisterListener/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/venue/:id" element={<SpecificVenue/>} />
                <Route path="/profile" element={<UserProfile/>} />
                <Route path="/profile/create" element={<CreateVenueForm/>} />
                <Route path="/profile/edit/:id" element={<EditVenueFormListener/>} />
              </Route>
            </Route>
          </Routes>
      </Router>
    </Container>
  )
}