import { Fragment, ReactView, UIController, UINavigate, UIView, UIViewBuilder, VStack, cTop, useNavigate, useState } from "@tuval/forms";
import { useCreateEmailSession, useGetMe } from "@realmocean/sdk";
import React from "react";
import { Container, Header, LoginContainer, LoginError, LoginForm, LoginInput, LoginLabel, LoginToSignUp, customLogo } from "./LoginStyles/Styles";
import Button from '../components/Button';
import Main from "../../server/hooks/main/Main";


export class LoginController extends UIController {


    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading, isError: isAccountGetError } = useGetMe('console');
        const { isLoading: isLoadingRequired, required } = Main.SetupRequired();

        const { createEmailSession, isSuccess, isError, error } = useCreateEmailSession('console');

        const [form, setForm] = useState({
            email: '',
            password: '',
            disabled: false
        });

        const handleFormChange = (e: any) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }

        const onSubmit = (e: any) => {
            e.preventDefault();
            setForm({ ...form, disabled: true })
            createEmailSession({
                email: form.email,
                password: form.password
            }, () => {
                navigate('/app/dashboard')
            })
            setForm({ ...form, disabled: false })
        }

        const HeaderInfo = () => {
            return (
                <Header>
                    <img src={customLogo} style={{ width: "50px", height: "50px" }} />
                    <LoginLabel>Pedavalans</LoginLabel>
                </Header>
            )
        }

        return (
            isLoading || isLoadingRequired ? Fragment() :
                me != null ? UINavigate('/app/dashboard') :
                    UIViewBuilder(() => {
                        return (
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
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    type="submit"
                                                    disabled={form.disabled}
                                                >Giriş Yap</Button>
                                                {isError && <LoginError>{error?.message}</LoginError>}
                                            </LoginForm>
                                            {
                                                required &&
                                                <LoginToSignUp onClick={() => navigate('/signup')}>
                                                    Kayıt Ol
                                                </LoginToSignUp>
                                            }
                                            <LoginToSignUp onClick={() => navigate('/reset-password')}>
                                                Şifrenizi mi unuttunuz?
                                            </LoginToSignUp>
                                        </LoginContainer>
                                    </Container>
                                )
                            ).height()
                        )
                    })
        )
    }
}