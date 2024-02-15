import { Services } from "@realmocean/sdk";
import React from "react";
import { VStack, useNavigate, useState, UIController, UIView, cTop, ReactView } from "@tuval/forms";
import { Container, Header, LoginContainer, LoginForm, LoginInput, LoginLabel, customLogo } from "./LoginStyles/Styles";
import Button from "../components/Button";
import { Toast } from "../components/Toast";


export class UpdatePasswordController extends UIController {
    public override LoadView(): UIView {

        const navigate = useNavigate();

        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const secret = params.get('secret');

        const [password, setPassword] = useState('');
        const [password1, setPassword1] = useState('');
        const [isRegexError, setIsRegexError] = useState(false)

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
                                    onChange={(e) => {
                                        if (e.target.value.length < 8 || !/[A-Z]/.test(e.target.value) || !/[a-z]/.test(e.target.value) || !/[!@#$%^&?*.]/.test(e.target.value)) {
                                            setIsRegexError(true)
                                        } else {
                                            setIsRegexError(false)
                                        }
                                        setPassword(e.target.value)
                                    }
                                    }
                                    placeholder="Yeni Şifre"
                                    name="password1"
                                    type="password"
                                    value={password}
                                    required
                                />
                                <LoginInput
                                    onChange={(e) => setPassword1(e.target.value)}
                                    placeholder="Yeni Şifreyi Tekrar Giriniz"
                                    name="password2"
                                    type="password"
                                    value={password1}
                                    required
                                />
                                {
                                    isRegexError && <div style={{ fontSize: "11px", color: "red" }}>Şifre en az 8 karakterden oluşmalı ve en az bir büyük harf, bir küçük harf ve bir özel karakter içermelidir.</div>
                                }
                                <Button
                                    variant="contained"
                                    fullWidth
                                    disabled={isRegexError || password != password1 || password.length < 8 || password1.length < 8}
                                    onClick={async () => {
                                        if (password === password1) {
                                            Services.Accounts.updateRecovery(userId, secret, password, password1).then(() => {
                                                navigate("/login");
                                            })
                                        } else {
                                            Toast.fire({
                                                icon: 'error',
                                                title: 'Şifreler uyuşmuyor'
                                            })
                                        }
                                    }}
                                >Şifreyi Güncelle</Button>
                            </LoginForm>
                        </LoginContainer>
                    </Container>
                )
            ).height()
        )
    }
}
