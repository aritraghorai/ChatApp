/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Container } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import './app.scss'
import HomeSceen from './sceens/HomeSceen'
import RegisterSceen from './sceens/RegisteSceen'
import LoginSceen from './sceens/loginSceen'

function App() {
    return (
        <Container className="pt-5">
            <Routes>
                <Route path="/register" element={<RegisterSceen />} />
                <Route path="/" element={<HomeSceen />} />
                <Route path="/login" element={<LoginSceen />} />
            </Routes>
        </Container>
    )
}

export default App
