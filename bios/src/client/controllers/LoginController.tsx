import { Fragment, ReactView, UIController, UINavigate, UIView, VStack, cTop, useNavigate, useState } from "@tuval/forms";
import { useCreateEmailSession, useGetMe } from "@realmocean/sdk";
import React from "react";
import { Container, Header, LoginButton, LoginContainer, LoginError, LoginForm, LoginInput, LoginLabel, LoginToSignUp, customLogo } from "./LoginStyles/Styles";


export class LoginController extends UIController {


    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading, isError: isAccountGetError } = useGetMe('console');

        const { createEmailSession, isSuccess, isError, error } = useCreateEmailSession('console');

        const [form, setForm] = useState({
            email: '',
            password: ''
        });

        const handleFormChange = (e: any) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }

        const HeaderInfo = () => {
            return (
                <Header>
                    <img src={customLogo} style={{ width: "50px", height: "50px" }} />
                    <LoginLabel>Pedavalans</LoginLabel>
                </Header>
            )
        }

        const onSubmit = (e: any) => {
            e.preventDefault();
            createEmailSession({
                email: form.email,
                password: form.password
            }, () => {

                navigate('/home')
            })
        }

        return (
            isLoading ? Fragment() :
                me != null ? UINavigate('/home') :
                    VStack({ alignment: cTop })(
                        ReactView(
                            <Container>
                                <LoginContainer>
                                    <HeaderInfo />
                                    <LoginForm onSubmit={onSubmit}>
                                        <LoginInput
                                            onChange={handleFormChange}
                                            placeholder="E-posta"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            required
                                        />
                                        <LoginInput
                                            onChange={handleFormChange}
                                            placeholder="Şifre"
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            required
                                        />
                                        <LoginButton>Giriş Yap</LoginButton>
                                        {isError && <LoginError>{error?.message}</LoginError>}
                                    </LoginForm>
                                    <LoginToSignUp onClick={() => navigate('/signup')}>
                                        Kayıt Ol
                                    </LoginToSignUp>
                                </LoginContainer>
                            </Container>
                        )
                    ).height()
        )
    }
}