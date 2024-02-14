import { Fragment, ReactView, UIController, UINavigate, UIView, VStack, cTop, useNavigate, useState } from "@tuval/forms";
import { Services } from "@realmocean/sdk";
import React from "react";
import { Container, Header, LoginContainer, LoginError, LoginForm, LoginInput, LoginLabel, LoginToSignUp, customLogo } from "./LoginStyles/Styles";
import Button from '../components/Button';


export class ResetPasswordController extends UIController {


    public LoadView(): UIView {

        const navigate = useNavigate();


        const [email, setEmail] = useState("");

        const handleFormChange = (e: any) => {
            setEmail(e.target.value)
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
                            <LoginForm>
                                <LoginInput
                                    onChange={handleFormChange}
                                    placeholder="E-posta"
                                    name="email"
                                    type="email"
                                    value={email}
                                    required
                                />
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={async () => {
                                        Services.Accounts.createRecovery(email, `${window.location.origin}/update-password`)
                                    }}
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