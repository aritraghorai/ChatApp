import React from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../queries'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const [errors, setErors] = useState(undefined)
    const navigate = useNavigate()
    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        onError: (err) => setErors(err.graphQLErrors[0].extensions.errors),
        onCompleted: () => navigate('/login')
    })

    const [registerFormData, setRegisterFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const onChangeHandler = (e) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitHander = (e) => {
        e.preventDefault()
        registerUser({
            variables: registerFormData
        })
    }
    return (
        <div>
            <Row className="bg-white py-5  justify-content-center mx-1">
                <Col md={6} lg={4} sm={8}>
                    <h1 className="text-center">Register</h1>
                    <Form onSubmit={onSubmitHander}>
                        {[
                            {
                                ele: 'email',
                                message: 'Enter Email',
                                type: 'email'
                            },
                            {
                                ele: 'username',
                                message: 'Enter Username',
                                type: 'text'
                            },
                            {
                                ele: 'password',
                                message: 'Enter Password',
                                type: 'password'
                            },
                            {
                                ele: 'confirmPassword',
                                message: 'Enter Password Again',
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
                                        value={registerFormData[ele]}
                                        name={ele}
                                        required
                                        placeholder={message}
                                    />
                                </Form.Group>
                            )
                        })}
                        <div className="text-center">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Loading' : 'Submit'}
                            </Button>
                            <h6 className="mt-2">
                                Have an Account? <Link to="/login">Login</Link>{' '}
                            </h6>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default RegisterForm
