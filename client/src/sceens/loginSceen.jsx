/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { LOGIN_USER } from '../queries'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'

export const TOKEN = 'TOKEN'
const LoginSceen = () => {
    const [errors, setErors] = useState(undefined)
    const navigate = useNavigate()
    const [login, { loading }] = useLazyQuery(LOGIN_USER, {
        onError: (err) => setErors(err?.graphQLErrors[0].extensions.errors),
        onCompleted: (res) => localStorage.setItem(TOKEN, res.login.token)
    })

    const [loginFormData, setloginFormData] = useState({
        username: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        setloginFormData({
            ...loginFormData,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitHander = (e) => {
        e.preventDefault()
        login({
            variables: loginFormData
        })
    }
    return (
        <div>
            <Row className="bg-white py-5  justify-content-center mx-1">
                <Col md={6} lg={4} sm={8}>
                    <h1 className="text-center">Login</h1>
                    <Form onSubmit={onSubmitHander}>
                        {[
                            {
                                ele: 'username',
                                message: 'Enter Username',
                                type: 'text'
                            },
                            {
                                ele: 'password',
                                message: 'Enter Password',
                                type: 'password'
                            }
                        ].map((element) => {
                            const { ele, message, type } = element
                            return (
                                <Form.Group
                                    key={ele}
                                    className="mb-3"
                                    controlId={ele}
                                >
                                    <Form.Label
                                        className={
                                            errors && errors[ele]
                                                ? 'text-danger'
                                                : ''
                                        }
                                    >
                                        {(errors && errors[ele]) ?? message}
                                    </Form.Label>
                                    <Form.Control
                                        className={
                                            errors && errors[ele]
                                                ? 'is-invalid'
                                                : ''
                                        }
                                        type={type}
                                        onChange={onChangeHandler}
                                        value={loginFormData[ele]}
                                        name={ele}
                                        required
                                        placeholder={message}
                                    />
                                </Form.Group>
                            )
                        })}
                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                {loading ? 'Loading' : 'Login'}
                            </Button>
                            <h6 className="mt-2">
                                Don't Have An Account?{' '}
                                <Link to="/register">Register Now</Link>{' '}
                            </h6>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default LoginSceen
