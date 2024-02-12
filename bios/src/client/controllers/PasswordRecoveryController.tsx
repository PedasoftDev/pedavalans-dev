import { Fragment, ReactView, UIController, UINavigate, UIView, VStack, cTop, useNavigate, useState } from "@tuval/forms";
import { Services } from "@realmocean/sdk";
import React from "react";
import { Container, Header, LoginContainer, LoginError, LoginForm, LoginInput, LoginLabel, LoginToSignUp, customLogo } from "./LoginStyles/Styles";
import Button from '../components/Button';


export class PasswordRecoveryController extends UIController {


    public LoadView(): UIView {

        const navigate = useNavigate();


        const [form, setForm] = useState({
            email: '',
        });

        const handleFormChange = (e: any) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }

        const onSubmit = (e: any) => {
            e.preventDefault();

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
                                <Button
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                >Kurtarma e-postası gönder</Button>
                            </LoginForm>
                            <LoginToSignUp onClick={() => navigate('/login')}>
                                Geri Dön
                            </LoginToSignUp>
                        </LoginContainer>
                    </Container>
                )
            ).height()
        )
    }
}