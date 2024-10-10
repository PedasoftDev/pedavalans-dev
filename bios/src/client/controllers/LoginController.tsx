import { Fragment, ReactView, UIController, UINavigate, UIView, UIViewBuilder, VStack, cTop, useNavigate, useState } from "@tuval/forms";
import { Services, useCreateEmailSession, useDeleteSession, useGetMe } from "@realmocean/sdk";
import React from "react";
import { Container, Header, LoginContainer, LoginError, LoginForm, LoginInput, LoginLabel, LoginToSignUp, customLogo } from "./LoginStyles/Styles";
import Button from '../components/Button';
import Main from "../../server/hooks/main/Main";
import { ProxyAccountBroker } from "../../server/brokers/ProxyAccountBroker";
import { Avatar, Dialog, DialogTitle, List, ListItemAvatar, ListItemButton, ListItemText, } from "@mui/material";
import { IoPersonCircleOutline } from "react-icons/io5";
import decrypt from "../assets/Functions/decrypt";

export class LoginController extends UIController {

    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading, isError: isAccountGetError } = useGetMe('console');
        const { isLoading: isLoadingRequired, required } = Main.SetupRequired();

        const { createEmailSession, isSuccess, isError, error } = useCreateEmailSession('console');
        const { deleteSession } = useDeleteSession('console');

        const [form, setForm] = useState({
            email: '',
            password: '',
            disabled: false
        });

        const [dialogOpen, setDialogOpen] = useState(false);
        const [proxyAccounts, setProxyAccounts] = useState([]);

        const handleFormChange = (e: any) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        };

        const handleProxyAccountSelection = (account: any) => {
            Services.Accounts.deleteSession('current').then(() => {
                createEmailSession({
                    email: account.email,
                    password: decrypt(account.password)
                }, () => {
                    localStorage.setItem('proxyAccount', account.agent_id);
                    localStorage.setItem('mainAccount', account.principal_id);
                    navigate('/app/dashboard');
                });
            });
        };

        const handlePersonalAccountSelection = () => {
            navigate('/app/dashboard');
        };

        const onSubmit = (e: any) => {
            e.preventDefault();
            setForm({ ...form, disabled: true });
            createEmailSession({
                email: form.email,
                password: form.password
            }, () => {
                Services.Accounts.get().then((res) => {
                    ProxyAccountBroker.Default.getByAgentUserId(res.$id).then((res) => {
                        if (res.result.length > 0) {
                            setProxyAccounts(res.result);
                            setDialogOpen(true);
                        } else {
                            navigate('/app/dashboard');
                        }
                    });
                });
            });
            setForm({ ...form, disabled: false });
        };

        const HeaderInfo = () => (
            <Header>
                <img src={customLogo} style={{ width: "50px", height: "50px" }} />
                <LoginLabel>Pedavalans</LoginLabel>
            </Header>
        );

        const handleClose = () => {
            setDialogOpen(false);
        };

        const renderDialog = () => (
            <Dialog onClose={handleClose} open={dialogOpen}>
                <DialogTitle>Giriş yapmak istediğiniz hesabı seçiniz</DialogTitle>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {proxyAccounts.map((account: any) => (
                        <ListItemButton key={account.email} onClick={() => handleProxyAccountSelection(account)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <IoPersonCircleOutline />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={account.email} secondary={account.principal_name} />
                        </ListItemButton>
                    ))}
                    <ListItemButton onClick={handlePersonalAccountSelection}>
                        <ListItemAvatar>
                            <Avatar>
                                <IoPersonCircleOutline />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={form.email} secondary={"Kişisel Hesap"} />
                    </ListItemButton>
                </List>
            </Dialog>
        );

        const renderLoginForm = () => (
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
        );

        const renderSignUpLinks = () => (
            <div>
                {required && <LoginToSignUp onClick={() => navigate('/signup')}>Kayıt Ol</LoginToSignUp>}
                <LoginToSignUp onClick={() => navigate('/reset-password')}>Şifrenizi mi unuttunuz?</LoginToSignUp>
            </div>
        );

        return (
            isLoading || isLoadingRequired ? Fragment() :
                me != null ? UINavigate('/app/dashboard') :
                    UIViewBuilder(() => (
                        VStack({ alignment: cTop })(
                            ReactView(
                                <Container>
                                    <LoginContainer>
                                        <HeaderInfo />
                                        {renderDialog()}
                                        {renderLoginForm()}
                                        {renderSignUpLinks()}
                                    </LoginContainer>
                                </Container>
                            )
                        ).height()
                    ))
        );
    }
}