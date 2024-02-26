import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, nanoid } from "@tuval/forms";
import { Views } from "../../../components/Views";
import React, { useEffect, useState } from "react";
import { useGetMe, Services, Query, setUpProject, useCreateAccount, useListAccounts, useCreateTeamMembership } from "@realmocean/sdk";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import IAccountRelation from "../../../interfaces/IAccountRelation";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import AppInfo from "../../../../AppInfo";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import { Toast } from "../../../components/Toast";
import { BsFillPersonFill } from "react-icons/bs";
import { TbBuildingCommunity } from "react-icons/tb";
import { Tab } from "../Views/Form";
import { IoPersonAddOutline } from "react-icons/io5";
import StyledDataGrid from "../../../components/StyledDataGrid";
import Swal from "sweetalert2";


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
    phone: "+",
    phoneVerification: false,
    prefs: { organization: "" },
    registration: "",
    status: false
}

const resetAccountRelation: IAccountRelation.IBase = {
    account_id: "",
    // first_name: "",
    // last_name: "",
    authorization_profile: "",
    id: "",
    is_active: true,
    is_deleted: false,
    is_admin: false,
    tenant_id: "",
}

export class AccountManagementViewController extends UIController {
    public LoadView(): UIView {

        const { me, isLoading } = useGetMe("console");
        const { updateAccountRelation } = AccountRelation.Update();
        const { createTeamMembership } = useCreateTeamMembership(AppInfo.Name)
        const {
            createAccount,
            isSuccess: isCreateAccountSuccess,
            isError: isCreateAccountError,
            error: createAccountError
        } = useCreateAccount('console');
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts()
        const { accountRelations, isLoadingResult } = AccountRelation.GetList(me?.prefs?.organization)
        const { createAccountRelation } = AccountRelation.Create()

        return (
            isLoading || isLoadingAccounts ? VStack(Spinner()) :
                me == null ? VStack(UINavigate("/login")) :
                    UIViewBuilder(() => {

                        const [accountInfo, setAccountInfo] = useState<IAccount.IBase>(resetMe)
                        const [accountRelation, setAccountRelation] = useState<IAccountRelation.IBase>(resetAccountRelation)
                        const [phone, setPhone] = useState<string>("")

                        // edit account info
                        const [selectedAccount, setSelectedAccount] = useState<IAccount.IBase>(resetMe)
                        const [selectedAccountRelation, setSelectedAccountRelation] = useState<IAccountRelation.IBase>(resetAccountRelation)

                        const [passwordChange, setPasswordChange] = useState<IAccount.IPasswordChange>({ password: "", newPassword: "", newPasswordConfirm: "" })
                        const [isRegexError, setIsRegexError] = useState(false)

                        const [createAccountForm, setCreateAccount] = useState({
                            email: "",
                            username: "",
                            password: "",
                            passwordConfirm: ""
                        })

                        const [selectedTab, setSelectedTab] = useState(0)

                        useEffect(() => {
                            if (me) {
                                setAccountInfo(me)
                                setPhone(accountInfo?.phone)
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, "account_relation", [Query.equal("account_id", me.$id)]).then((data) => {
                                    setAccountRelation(removeDollarProperties(data.documents[0]))
                                })
                            }
                        }, [])

                        const handleSubmit = async () => {
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
                            setUpProject("console", undefined);
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

                        const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();

                            if (createAccountForm.password !== createAccountForm.passwordConfirm) {
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Şifreler uyuşmuyor'
                                })
                                return
                            }

                            if (createAccountForm.password.length < 8 || !/[A-Z]/.test(createAccountForm.password) || !/[a-z]/.test(createAccountForm.password) || !/[!@#$%^&*.]/.test(createAccountForm.password)) {
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Şifre en az 8 karakter olmalı, büyük harf, küçük harf ve özel karakter içermelidir!'
                                })
                                return
                            }
                            // Services.Client.setProject("console");
                            // Services.Client.setMode(undefined);

                            createAccount({
                                name: createAccountForm.username,
                                email: createAccountForm.email,
                                password: createAccountForm.password,
                                organizationId: me?.prefs?.organization
                            }, (data) => {
                                const docId: string = nanoid()
                                createTeamMembership({
                                    teamId: me?.prefs?.organization,
                                    roles: [],
                                    url: "",
                                    userId: data.$id,
                                }, () => {
                                    createAccountRelation({
                                        documentId: docId,
                                        data: {
                                            "id": docId,
                                            "tenant_id": me?.prefs?.organization,
                                            "account_id": docId,
                                            "is_admin": false
                                        }
                                    }, () => {
                                        Toast.fire({
                                            icon: 'success',
                                            title: 'Kullanıcı oluşturuldu'
                                        })
                                        setCreateAccount({ email: "", username: "", password: "", passwordConfirm: "" })
                                    })
                                })

                            })
                            if (isCreateAccountError) {
                                Toast.fire({
                                    icon: 'error',
                                    title: createAccountError?.message
                                })
                            }
                        }

                        const setEditAccount = (account: IAccount.IBase) => {
                            console.log(account)
                            setSelectedAccount(account)
                            setSelectedAccountRelation(accountRelations.find((e) => e.account_id === account.$id))
                            setSelectedTab(3)
                        }

                        const updateSelectedAccountRelation = (e) => {
                            e.preventDefault();
                            updateAccountRelation({
                                databaseId: AppInfo.Database,
                                collectionId: "account_relation",
                                documentId: selectedAccountRelation.id,
                                data: removeDollarProperties(selectedAccountRelation)
                            }, (data) => {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Hesap bilgileri güncellendi'
                                })
                                setSelectedTab(1)
                                setSelectedAccountRelation(resetAccountRelation)
                                setSelectedAccount(resetMe);
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
                                                <Tab active={selectedTab === 0} onClick={() => setSelectedTab(0)}>
                                                    <BsFillPersonFill />
                                                    <div>Hesabım</div>
                                                </Tab>
                                                {
                                                    accountRelation.is_admin &&
                                                    <Tab active={selectedTab === 1} onClick={() => setSelectedTab(1)}>
                                                        <TbBuildingCommunity />
                                                        <div>Organizasyon Kullanıcı Listesi</div>
                                                    </Tab>
                                                }
                                                {
                                                    accountRelation.is_admin &&
                                                    <Tab active={selectedTab === 2} onClick={() => setSelectedTab(2)}>
                                                        <IoPersonAddOutline />
                                                        <div>Yeni Kullanıcı</div>
                                                    </Tab>
                                                }
                                            </div>
                                            {selectedTab === 0 &&
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
                                                                label="Adı Soyadı"
                                                                value={accountInfo.name}
                                                            />
                                                            <TextField
                                                                size="small"
                                                                label="Telefon"
                                                                value={phone}
                                                                onChange={(e) => {
                                                                    let enteredValue = e.target.value;
                                                                    // Eğer boşsa, varsayılan olarak + karakterini ekle
                                                                    if (!enteredValue.startsWith("+")) {
                                                                        enteredValue = "+" + enteredValue
                                                                    }
                                                                    // Max 15 basamaklı olmalı ve + ile başlamalı
                                                                    if (/^\+?\d{0,15}$/.test(enteredValue)) {
                                                                        setPhone(enteredValue);
                                                                    }
                                                                }}
                                                            />
                                                            {/* <TextField
                                                                size="small"
                                                                label="Ad"
                                                                value={accountRelation.first_name}
                                                                onChange={(e) => setAccountRelation({ ...accountRelation, first_name: e.target.value })}
                                                            />
                                                            <TextField
                                                                size="small"
                                                                label="Soyad"
                                                                value={accountRelation.last_name}
                                                                onChange={(e) => setAccountRelation({ ...accountRelation, last_name: e.target.value })}
                                                            /> */}
                                                            {accountRelation.is_admin && <FormControlLabel
                                                                sx={{ alignContent: "end" }}
                                                                control={<Switch checked={accountRelation.is_active} />}
                                                                label="Hesap aktif mi?"
                                                            />}
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
                                                        <form style={{
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
                                                                onChange={(e) => {
                                                                    if (e.target.value.length < 8 || !/[A-Z]/.test(e.target.value) || !/[a-z]/.test(e.target.value) || !/[!@#$%^&?*.]/.test(e.target.value)) {
                                                                        setIsRegexError(true)
                                                                    } else {
                                                                        setIsRegexError(false)
                                                                    }
                                                                    setPasswordChange({ ...passwordChange, newPassword: e.target.value })
                                                                }}
                                                                error={isRegexError}
                                                                helperText={isRegexError ? "Şifreniz en az 8 karakter olmalı, büyük harf, küçük harf ve özel karakter içermelidir" : ""}
                                                            />
                                                            <TextField
                                                                size="small"
                                                                placeholder="Yeni Şifre Tekrar"
                                                                type="password"
                                                                value={passwordChange.newPasswordConfirm}
                                                                onChange={(e) => setPasswordChange({ ...passwordChange, newPasswordConfirm: e.target.value })}
                                                            />
                                                            <Button
                                                                variant="contained"
                                                                onClick={handleChangePassword}
                                                                disabled={isRegexError}>Şifreyi Değiştir</Button>
                                                        </form>
                                                    </div>
                                                </div>
                                            }
                                            {selectedTab === 1 &&
                                                <div style={{
                                                    height: "calc(100vh - 150px)",
                                                    width: "calc(100vw - 310px)"
                                                }}>
                                                    <StyledDataGrid
                                                        columns={[
                                                            { field: '$id', headerName: 'ID', width: 100 },
                                                            { field: 'email', headerName: 'E-posta', flex: 1 },
                                                            { field: 'name', headerName: 'Adı Soyadı', flex: 1 },
                                                            {
                                                                field: 'value', headerName: "İşlemler", width: 150,
                                                                renderCell: (params: any) => <Button variant="text" onClick={() => setEditAccount(params.row)}>Düzenle</Button>
                                                            }
                                                        ]}
                                                        rows={accounts}
                                                        getRowId={(row) => row.$id} />
                                                </div>
                                            }
                                            {selectedTab === 2 &&
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    width: "100%",
                                                }}>
                                                    <form onSubmit={handleCreateAccount} style={{
                                                        border: "1px solid #e0e0e0",
                                                        borderRadius: "5px",
                                                        padding: "20px",
                                                        width: "50%",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        background: "rgb(250 250 250)",
                                                        gap: "10px"
                                                    }}>
                                                        <TextField
                                                            size="small"
                                                            label="E-posta"
                                                            value={createAccountForm.email}
                                                            onChange={(e) => setCreateAccount({ ...createAccountForm, email: e.target.value })}
                                                            fullWidth
                                                            required
                                                        />
                                                        <TextField
                                                            size="small"
                                                            label="Adı Soyadı"
                                                            value={createAccountForm.username}
                                                            onChange={(e) => setCreateAccount({ ...createAccountForm, username: e.target.value })}
                                                            fullWidth
                                                            required
                                                        />
                                                        <TextField
                                                            size="small"
                                                            label="Şifre"
                                                            value={createAccountForm.password}
                                                            onChange={(e) => setCreateAccount({ ...createAccountForm, password: e.target.value })}
                                                            fullWidth
                                                            type="password"
                                                            required
                                                        />
                                                        <TextField
                                                            size="small"
                                                            label="Şifre Tekrar"
                                                            value={createAccountForm.passwordConfirm}
                                                            onChange={(e) => setCreateAccount({ ...createAccountForm, passwordConfirm: e.target.value })}
                                                            fullWidth
                                                            type="password"
                                                            required
                                                        />
                                                        <Button variant="contained" type="submit" fullWidth>Kullanıcı Oluştur</Button>
                                                    </form>
                                                </div>
                                            }
                                            {selectedTab === 3 &&
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    width: "100%",
                                                }}>
                                                    <form onSubmit={updateSelectedAccountRelation} style={{
                                                        border: "1px solid #e0e0e0",
                                                        borderRadius: "5px",
                                                        padding: "20px",
                                                        width: "50%",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        background: "rgb(250 250 250)",
                                                        gap: "10px"
                                                    }}>
                                                        <TextField
                                                            size="small"
                                                            label="E-posta"
                                                            value={selectedAccount.email}
                                                            fullWidth
                                                            required
                                                        />
                                                        <TextField
                                                            size="small"
                                                            label="Adı Soyadı"
                                                            value={selectedAccount.name}
                                                            fullWidth
                                                            required
                                                        />
                                                        <TextField
                                                            size="small"
                                                            label="Telefon Numarası"
                                                            value={selectedAccount.phone}
                                                            fullWidth
                                                        />
                                                        {/* <TextField
                                                            size="small"
                                                            label="Adı"
                                                            value={selectedAccountRelation.first_name}
                                                            onChange={(e) => setSelectedAccountRelation({ ...selectedAccountRelation, first_name: e.target.value })}
                                                            fullWidth
                                                        />
                                                        <TextField
                                                            size="small"
                                                            label="Soyadı"
                                                            value={selectedAccountRelation.last_name}
                                                            onChange={(e) => setSelectedAccountRelation({ ...selectedAccountRelation, last_name: e.target.value })}
                                                            fullWidth
                                                        /> */}
                                                        {
                                                            accountRelation.is_admin && <FormControlLabel
                                                                sx={{ alignContent: "end" }}
                                                                control={
                                                                    <Switch
                                                                        checked={selectedAccountRelation.is_active}
                                                                        onChange={(e) => setSelectedAccountRelation({ ...selectedAccountRelation, is_active: e.target.checked })}
                                                                    />}
                                                                label="Hesap aktif mi?"
                                                            />
                                                        }
                                                        <Button variant="contained" type="submit" fullWidth>Kullanıcıyı Düzenle</Button>
                                                    </form>
                                                </div>
                                            }
                                        </div >
                                    )
                                )
                            ).padding("0 20px")
                        )
                    })
        )
    }
}