import { Fragment, ReactView, UIController, UINavigate, UIView, VStack, cTop, useNavigate, useState } from "@tuval/forms";
import { Services } from "@realmocean/sdk";
import React from "react";
import { Container, Header, LoginContainer, LoginError, LoginForm, LoginInput, LoginLabel, LoginToSignUp, customLogo } from "./LoginStyles/Styles";
import Button from '../components/Button';


export class ResetPasswordController extends UIController {


    public LoadView(): UIView {

        const navigate = useNavigate();


        const [email, setEmail] = useState("");
        const [tab, setTab] = useState(0);

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
                            {
                                tab === 0 &&
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
                                            Services.Accounts.createRecovery(email, `${window.location.origin}/update-password`).then(() => {
                                                setTab(1);
                                            }).catch(() => {
                                                setTab(2);
                                            })
                                        }}
                                    >Kurtarma e-postası gönder</Button>
                                </LoginForm>
                            }
                            {
                                tab === 1 &&
                                <LoginForm>
                                    <LoginError>
                                        Kurtarma e-postası gönderildi. E-postanızı kontrol edin.
                                    </LoginError>
                                </LoginForm>
                            }
                            {
                                tab === 2 &&
                                <LoginForm>
                                    <LoginError>
                                        E-posta bulunamadı.
                                    </LoginError>
                                </LoginForm>
                            }
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