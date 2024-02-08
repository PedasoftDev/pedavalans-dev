import { HStack, ReactView, Spinner, UIController, UINavigate, UIViewBuilder, VStack, cLeading, cTop, cTopLeading } from "@tuval/forms";
import { Views } from "../../../components/Views";
import React, { useEffect, useState } from "react";
import { useGetMe, Services, Query } from "@realmocean/sdk";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { LeftContainer, Main, RightContainer, SecureForm, Title } from "../Views/Form";
import IAccountRelation from "../../../interfaces/IAccountRelation";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import AppInfo from "../../../../AppInfo";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import { Toast } from "../../../components/Toast";
import { BsFillPersonFill } from "react-icons/bs";
import { TbBuildingCommunity } from "react-icons/tb";


const resetMe: IAccount.IBase = {
    $createdAt: "",
    $id: "",
    $updatedAt: "",
    accessedAt: "",
    email: "",
    emailVerification: false,
    labels: [],
    name: "",
    passwordUpdate: "",
    phone: "",
    phoneVerification: false,
    prefs: { organization: "" },
    registration: "",
    status: false
}

const resetAccountRelation: IAccountRelation.IBase = {
    account_id: "",
    first_name: "",
    last_name: "",
    id: "",
    is_active: true,
    is_deleted: false,
    is_admin: false,
    tenant_id: "",
}

export class AccountManagementViewController extends UIController {
    public LoadView(): any {

        const { me, isLoading } = useGetMe("console");
        const { updateAccountRelation } = AccountRelation.Update();

        return (
            isLoading ? VStack(Spinner()) :
                me == null ? VStack(UINavigate("/login")) :
                    UIViewBuilder(() => {
                        const [accountInfo, setAccountInfo] = useState<IAccount.IBase>(resetMe)
                        const [accountRelation, setAccountRelation] = useState<IAccountRelation.IBase>(resetAccountRelation)
                        const [passwordChange, setPasswordChange] = useState<IAccount.IPasswordChange>({ password: "", newPassword: "", newPasswordConfirm: "" })
                        useEffect(() => {
                            if (me) {
                                setAccountInfo(me)
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, "account_relation", [Query.equal("account_id", me.$id)]).then((data) => {
                                    setAccountRelation(removeDollarProperties(data.documents[0]))
                                })
                            }
                        }, [])

                        const handleSubmit = () => {
                            updateAccountRelation({
                                databaseId: AppInfo.Database,
                                collectionId: "account_relation",
                                documentId: accountRelation.id,
                                data: accountRelation
                            }, (data) => {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Hesap bilgileri güncellendi'
                                })

                                setAccountRelation(removeDollarProperties(data))
                            })
                        }

                        const handleChangePassword = () => {
                            if (passwordChange.newPassword !== passwordChange.newPasswordConfirm) {
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Yeni şifreler uyuşmuyor'
                                })
                                return
                            }
                            Services.Accounts.updatePassword(passwordChange.newPassword, passwordChange.password).then(() => {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Şifre değiştirildi'
                                })
                                setPasswordChange({ password: "", newPassword: "", newPasswordConfirm: "" })
                            }).catch((e) => {
                                Toast.fire({
                                    icon: 'error',
                                    text: JSON.stringify(e)
                                })
                            })
                        }

                        return (
                            VStack({ spacing: 15, alignment: cTopLeading })(
                                HStack({ alignment: cLeading })(
                                    Views.Title("Hesap Yönetimi").paddingTop("10px"),
                                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                HStack({ alignment: cTop })(
                                    ReactView(
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "20px",
                                            width: "100%",
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                gap: "10px"
                                            }}>
                                                <div style={{
                                                    display: "flex",
                                                    gap: "5px",
                                                    fontSize: "14px",
                                                    background: "blue",
                                                    color: "white",
                                                    padding: "10px 15px",
                                                    borderRadius: "5px"
                                                }}>
                                                    <BsFillPersonFill />
                                                    <div>Hesabım</div>
                                                </div>
                                                {
                                                    accountRelation.is_admin &&
                                                    <div style={{
                                                        display: "flex",
                                                        gap: "5px",
                                                        fontSize: "14px",
                                                        padding: "10px 15px",
                                                        borderRadius: "5px"
                                                    }}>
                                                        <TbBuildingCommunity />
                                                        <div>Organizasyon Kullanıcı Listesi</div>
                                                    </div>
                                                }
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                gap: "10px"
                                            }}>
                                                <div style={{
                                                    border: "1px solid #e0e0e0",
                                                    borderRadius: "5px",
                                                    padding: "20px",
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    background: "rgb(250 250 250)"
                                                }}>
                                                    <div style={{
                                                        display: "flex", alignItems: "center", borderBottom: "1px solid #e0e0e0",
                                                        paddingBottom: "10px", fontSize: "16px"
                                                    }}>Profil Detayları</div>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "10px",
                                                        marginTop: "10px"
                                                    }}>
                                                        <TextField
                                                            label="E-posta"
                                                            value={accountInfo.email}
                                                            size="small"
                                                        />
                                                        <TextField
                                                            size="small"
                                                            label="Kullanıcı Adı"
                                                            value={accountInfo.name}
                                                        />
                                                        <TextField
                                                            size="small"
                                                            label="Telefon"
                                                            value={accountInfo.phone}
                                                        />
                                                        <TextField
                                                            size="small"
                                                            label="Ad"
                                                            value={accountRelation.first_name}
                                                        />
                                                        <TextField
                                                            size="small"
                                                            label="Soyad"
                                                            value={accountRelation.last_name}
                                                        />
                                                        <FormControlLabel
                                                            sx={{ alignContent: "end" }}
                                                            control={<Switch checked={accountRelation.is_active} />}
                                                            label="Hesap aktif mi?"
                                                        />
                                                        <Button variant="contained" onClick={handleSubmit}>Kaydet</Button>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    border: "1px solid #e0e0e0",
                                                    borderRadius: "5px",
                                                    padding: "20px",
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    background: "rgb(250 250 250)",
                                                    height: "fit-content"
                                                }}>
                                                    <div style={{
                                                        display: "flex", alignItems: "center", borderBottom: "1px solid #e0e0e0",
                                                        paddingBottom: "10px", fontSize: "16px"
                                                    }}>Şifre Yönetimi</div>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "10px",
                                                        marginTop: "10px"
                                                    }}>
                                                        <TextField
                                                            size="small"
                                                            placeholder="Eski Şifre"
                                                            type="password"
                                                            value={passwordChange.password}
                                                            onChange={(e) => setPasswordChange({ ...passwordChange, password: e.target.value })}
                                                        />
                                                        <TextField
                                                            size="small"
                                                            placeholder="Yeni Şifre"
                                                            type="password"
                                                            value={passwordChange.newPassword}
                                                            onChange={(e) => setPasswordChange({ ...passwordChange, newPassword: e.target.value })}
                                                        />
                                                        <TextField
                                                            size="small"
                                                            placeholder="Yeni Şifre Tekrar"
                                                            type="password"
                                                            value={passwordChange.newPasswordConfirm}
                                                            onChange={(e) => setPasswordChange({ ...passwordChange, newPasswordConfirm: e.target.value })}
                                                        />
                                                        <Button variant="contained" onClick={handleChangePassword}>Şifreyi Değiştir</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                    )
                                )
                            ).padding("0 20px")
                        )
                    })
        )


    }
}