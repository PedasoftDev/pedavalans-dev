import { Button, HStack, SecureField, Spinner, Text, TextField, UIController, UIImage, UINavigate, UIView, VStack, cLeading, useNavigate, useState } from "@tuval/forms";
import { useCreateAccount, useCreateEmailSession, useGetMe } from "@realmocean/sdk";
import { customLogo, bgImage } from "./LoginStyles/Styles";
import Main from "../../server/hooks/main/Main";

export class SignupController extends UIController {


    public LoadView(): UIView {

        const navigate = useNavigate();

        const [form, setForm] = useState({
            userName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        });

        const [isRegexError, setIsRegexError] = useState(false);

        const {
            createAccount,
            isSuccess: isCreateAccountSuccess,
            isError: isCreateAccountError,
            error: createAccountError
        } = useCreateAccount('console');
        const { createEmailSession, isSuccess, isError, error } = useCreateEmailSession('console');

        const { isLoading, required } = Main.SetupRequired()

        const onSubmit = () => {
            if (form.password !== form.passwordConfirm || form.password === '' || form.passwordConfirm === '') {
                alert('Şifreler eşleşmiyor!');
                return;
            }
            createAccount({
                name: form.userName,
                email: form.email,
                password: form.password
            }, () => {
                createEmailSession({
                    email: form.email,
                    password: form.password
                }, () => navigate('/app/dashboard'))
            })

        }

        return (
            isLoading ? VStack(Spinner()) :
                !required ? UINavigate('/login') :
                    VStack(
                        // Sign up Container
                        VStack(
                            // Sign up Header
                            HStack({ spacing: 10 })(
                                UIImage(customLogo).width("50px").height("50px"),
                                Text("Pedavalans").fontSize("30px").fontWeight("400").foregroundColor("#3BA2EE").kerning("1px")
                            ).marginBottom("20px"),
                            // Sign up Form
                            VStack({ spacing: 10 })(
                                VStack({ spacing: 3, alignment: cLeading })(
                                    Text("Adı Soyadı"),
                                    TextField().onChange(e => setForm({ ...form, userName: e }))
                                ).height(),
                                VStack({ spacing: 3, alignment: cLeading })(
                                    Text("E-posta"),
                                    TextField().onChange(e => setForm({ ...form, email: e }))
                                ).height(),
                                VStack({ spacing: 3, alignment: cLeading })(
                                    Text("Şifre"),
                                    SecureField().onChange(e => {
                                        if (e.length < 8 || !/[A-Z]/.test(e) || !/[a-z]/.test(e) || !/[!@#$%^&*.]/.test(e)) {
                                            setIsRegexError(true)
                                        } else {
                                            setIsRegexError(false)
                                        }
                                        setForm({ ...form, password: e })
                                    }),
                                ).height(),
                                VStack({ spacing: 3, alignment: cLeading })(
                                    Text("Şifreyi Onayla"),
                                    SecureField().onChange(e => setForm({ ...form, passwordConfirm: e })),
                                ).height(),
                                Button(
                                    Text("Kayıt Ol")
                                ).width("100%").onClick(onSubmit),
                                VStack({ spacing: 2 })(
                                    Text("Zaten bir hesabın var mı?"),
                                    Text("Giriş Yap").foregroundColor("#3BA2EE").cursor("pointer").transition("0.3s").onClick(() => navigate('/login'))
                                )
                            ),
                        ).width("400px").height().minWidth("100px").minHeight("200px").padding("20px").background("rgba(255, 255, 255, 0.7)").cornerRadius("10px").shadow("0 0 10px rgba(0, 0, 0, 0.35)")
                    ).background(bgImage).backgroundSize('cover')
        )
    }
}