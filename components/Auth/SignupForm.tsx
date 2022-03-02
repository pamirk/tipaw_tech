import * as React from "react"
import {useState} from "react"
import {Button, Checkbox, Form, Input} from 'antd';
import styled from '@emotion/styled'
import { css } from '@emotion/css'

import {apiPost} from "../../hooks/api"
import {useRouter} from "next/router"
import {AuthType, useAuth} from "../../context/AuthContext"
import { ErrorMsg } from "./AuthComponents";

export const SignupForm = () => {
    const {isLoggedIn, login} = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmmitting] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSignup = (values: any) => {
        setIsSubmmitting(true)
        apiPost<AuthType>(`/api/user`, {
            values
        })
            .then((res) => {
                if (res.error || !res.token) {
                    setError(res.message)
                } else {
                    login(res.token)
                }
            })
            .catch((ex) => setError(ex.message))
            .finally(() => setIsSubmmitting(false))
    }

    if (isLoggedIn) {
        router.push("/")
    }
    return (
        <Form
            size='large'
            layout="vertical"
            name="basic"
            labelCol={{span: 12}}
            wrapperCol={{span: 32}}
            initialValues={{remember: true}}
            onFinish={handleSignup}
            autoComplete="off"
        >
            <Form.Item
                label="Votre prénom"
                name="firstName"
                rules={[{required: true, message: 'Ce champ est requis', min: 1}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Votre nom"
                name="lastName"
                rules={[{required: true, message: 'Ce champ est requis', min: 1}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Votre email"
                name="email"
                rules={[{required: true, message: 'Adresse email invalide'}]}
            >
                <Input type="email"/>
            </Form.Item>

            <Form.Item
                label="Votre mot de passe"
                name="password"
                dependencies={['confirm']}
                hasFeedback
                rules={[{required: true, message: 'Veuillez entrer 6 caractère(s) minimum!', min: 6},]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                hasFeedback
                dependencies={['password']}
                label="Confirmez votre mot de passe"
                name="confirm"
                rules={[{required: true, message: 'Veuillez entrer 6 caractère(s) minimum!', min: 6},
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>


            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>J`ai lu et accepté les conditions générales d`utilisation de Tipaw</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button className={buttonStyle} htmlType="submit" loading={isSubmitting}>
                    Submit
                </Button>
            </Form.Item>
            {error !== "" && <ErrorMsg>{error}</ErrorMsg>}

            <Form.Item>
                <BottomCaption>
                    <span>Vous avez déjà un compte? <Link>S`identifier</Link></span>
                </BottomCaption>
            </Form.Item>
        </Form>
    )
}
const buttonStyle = css`
  white-space: nowrap;
  border-radius: 15px;
  height: 40px;
  line-height: unset;
  padding: 0px 24px;
  box-shadow: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #ffcc01;
  border: none white;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0;
  cursor: pointer;
  :hover {
    background-color: #fceba6;
  }

`
const BottomCaption = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 12px


`
const Link = styled.a`
  color: rgb(90, 206, 232);
  font-weight: 700;
  margin-left: 12px;
`