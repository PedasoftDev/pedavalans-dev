import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, nanoid } from "@tuval/forms";
import { Views } from "../../../components/Views";
import React, { useEffect, useState } from "react";
import { useGetMe, Services, Query, setUpProject, useCreateAccount, useListAccounts, EmailBroker } from "@realmocean/sdk";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Switch, TextField } from "@mui/material";
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
import { GridContainer } from "../Views/View";
import ModeIcon from '@mui/icons-material/Mode';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import AssignEducation from "../../../../server/hooks/assignEducation/main";


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
    registration_number: "",
    mail: "",
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
        const {
            createAccount,
            isError: isCreateAccountError,
            error: createAccountError
        } = useCreateAccount('console');
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts([Query.limit(10000)])
        const { accountRelations, isLoadingResult } = AccountRelation.GetList(me?.prefs?.organization)
        const { createAccountRelation } = AccountRelation.Create()
        const { assignedEducationList, isLoadingAssignedEducationList } = AssignEducation.GetList(me?.prefs?.organization)

        return (
            isLoading || isLoadingAccounts || isLoadingResult || isLoadingAssignedEducationList ? VStack(Spinner()) :
                me == null ? VStack(UINavigate("/login")) :
                    UIViewBuilder(() => {

                        const [accountInfo, setAccountInfo] = useState<IAccount.IBase>(resetMe)
                        const [accountRelation, setAccountRelation] = useState<IAccountRelation.IBase>(resetAccountRelation)

                        // edit account info
                        const [selectedAccount, setSelectedAccount] = useState<IAccount.IBase>(resetMe)
                        const [selectedAccountRelation, setSelectedAccountRelation] = useState<IAccountRelation.IBase>(resetAccountRelation)
                        const [selectedAccountRelationIsActive, setSelectedAccountRelationIsActive] = useState<boolean>(true)

                        const [passwordChange, setPasswordChange] = useState<IAccount.IPasswordChange>({ password: "", newPassword: "", newPasswordConfirm: "" })
                        const [isRegexError, setIsRegexError] = useState(false)

                        // edit account
                        const [form, setForm] = useState({
                            id: "",
                            label: "",
                            value: "",
                            password: ""
                        })
                        const [open, setOpen] = useState(false)

                        const [createAccountForm, setCreateAccount] = useState({
                            registrationNumber: "",
                            email: "",
                            username: "",
                            password: "",
                            passwordConfirm: ""
                        })

                        const [selectedTab, setSelectedTab] = useState(0)

                        useEffect(() => {
                            if (me) {
                                setAccountInfo(me)
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, "account_relation", [Query.limit(10000), Query.equal("account_id", me.$id)]).then((data) => {
                                    setAccountRelation(removeDollarProperties(data.documents[0]))
                                })
                            }
                        }, [])

                        const handleSubmit = () => {
                            if (form.value === "" || (form.id != "name" && form.password === "")) {
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Boş alan bırakmayınız'
                                })
                                return
                            }
                            if (form.id === "email") {
                                setUpProject("console", undefined);
                                Services.Accounts.updateEmail(form.value, form.password).then(() => {
                                    Toast.fire({
                                        icon: 'success',
                                        title: 'E-posta değiştirildi'
                                    })
                                    window.location.reload()
                                })
                            } else if (form.id === "name") {
                                setUpProject("console", undefined);
                                Services.Accounts.updateName(form.value).then(() => {
                                    Toast.fire({
                                        icon: 'success',
                                        title: 'Ad değiştirildi'
                                    })
                                    window.location.reload()
                                })

                            } else if (form.id === "phone") {
                                setUpProject("console", undefined);
                                Services.Accounts.updatePhone(form.value, form.password).then(() => {
                                    Toast.fire({
                                        icon: 'success',
                                        title: 'Telefon değiştirildi'
                                    })
                                    window.location.reload()
                                }).catch((e) => {
                                    alert("Hata: Telefon numarası + ile başlamalıdır ve en az 13 haneli ve en fazla 15 haneli olmalıdır")
                                })

                            } else {
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Bir hata oluştu'
                                })
                            }
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
                            if (!isLoadingResult && accountRelations) {
                                console.log(accountRelations);
                                const isRegistrationNumberExists = accountRelations.some(
                                    (relation) => relation.registration_number === createAccountForm.registrationNumber
                                );

                                if (isRegistrationNumberExists) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Sicil numarası zaten kayıtlı !'
                                    })
                                    return
                                }
                            }

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

                            createAccount({
                                name: createAccountForm.username,
                                email: createAccountForm.email,
                                password: createAccountForm.password,
                                organizationId: me?.prefs?.organization
                            }, (data) => {
                                const docId: string = nanoid()
                                createAccountRelation({
                                    documentId: docId,
                                    data: {
                                        id: docId,
                                        tenant_id: me?.prefs?.organization,
                                        account_id: data.$id,
                                        mail: data.email,
                                        registration_number: createAccountForm.registrationNumber,
                                        is_admin: false
                                    }
                                }, async () => {
                                    Toast.fire({
                                        icon: 'success',
                                        title: 'Kullanıcı oluşturuldu'
                                    })
                                    setCreateAccount({ registrationNumber: "", email: "", username: "", password: "", passwordConfirm: "" })
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
                            setSelectedAccount(account)
                            setSelectedAccountRelation(accountRelations.find((e) => e.account_id === account.$id))
                            setSelectedAccountRelationIsActive(accountRelations.find((e) => e.account_id === account.$id).is_active)
                            setSelectedTab(3)
                        }

                        const updateSelectedAccountRelation = (e) => {
                            e.preventDefault();
                            if (assignedEducationList.filter((item) => item.status === "open").find((item) => item.educator_id === selectedAccount.$id)) {
                                Swal.fire({
                                    title: 'Bu hesaba ait açık bir eğitim bulunmaktadır!',
                                    text: "Bu hesabı düzenleyemezsiniz!",
                                    icon: 'error',
                                    confirmButtonColor: '#d33',
                                    confirmButtonText: 'Tamam',
                                })
                                return
                            }
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
                                                            <div style={{ display: "flex", gap: "5px" }}>
                                                                <TextField
                                                                    label="E-posta"
                                                                    value={accountInfo.email}
                                                                    size="small"
                                                                    fullWidth
                                                                />
                                                                <IconButton color="primary" onClick={() => {
                                                                    setForm({
                                                                        id: "email",
                                                                        label: "E-posta",
                                                                        value: accountInfo.email,
                                                                        password: ""
                                                                    })
                                                                    setOpen(true)
                                                                }}>
                                                                    <ModeIcon />
                                                                </IconButton>
                                                            </div>
                                                            <div style={{ display: "flex", gap: "5px" }}>
                                                                <TextField
                                                                    size="small"
                                                                    label="Adı Soyadı"
                                                                    value={accountInfo.name}
                                                                    fullWidth
                                                                />
                                                                <IconButton color="primary" onClick={() => {
                                                                    setForm({
                                                                        id: "name",
                                                                        label: "Adı Soyadı",
                                                                        value: accountInfo.name,
                                                                        password: ""
                                                                    })
                                                                    setOpen(true)
                                                                }}>
                                                                    <ModeIcon />
                                                                </IconButton>
                                                            </div>
                                                            <div style={{ display: "flex", gap: "5px" }}>
                                                                <TextField
                                                                    size="small"
                                                                    label="Telefon"
                                                                    fullWidth
                                                                    value={accountInfo.phone}
                                                                />
                                                                <IconButton color="primary" onClick={() => {
                                                                    setForm({
                                                                        id: "phone",
                                                                        label: "Telefon",
                                                                        value: accountInfo.phone,
                                                                        password: ""
                                                                    })
                                                                    setOpen(true)
                                                                }}>
                                                                    <ModeIcon />
                                                                </IconButton>
                                                            </div>
                                                            <div style={{ display: "flex", gap: "5px" }}>
                                                                <TextField
                                                                    size="small"
                                                                    label="Yetki Profili"
                                                                    fullWidth
                                                                    value={(accountRelation?.is_admin || accountRelation?.authorization_profile === "admin") ? "Yönetici" :
                                                                        accountRelation.authorization_profile === "responsible" ? "Sorumlu" : "Kullanıcı"
                                                                    }
                                                                />
                                                                <IconButton color="primary" disableRipple>
                                                                    <LockPersonIcon />
                                                                </IconButton>
                                                            </div>
                                                            <Dialog open={open} onClose={() => setOpen(false)}>
                                                                <DialogTitle>{form.label} değiştir</DialogTitle>
                                                                <DialogContent>
                                                                    <div style={{ width: "300px", padding: "10px", display: "flex", gap: "10px", flexDirection: "column" }}>
                                                                        <TextField
                                                                            size="small"
                                                                            label={form.label}
                                                                            value={form.value}
                                                                            onChange={(e) => setForm({ ...form, value: e.target.value })}
                                                                            fullWidth
                                                                        />
                                                                        {(form.id === "email" || form.id === "phone") &&
                                                                            <TextField
                                                                                size="small"
                                                                                label={"Şifre"}
                                                                                type="password"
                                                                                value={form.password}
                                                                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                                                                fullWidth
                                                                            />
                                                                        }
                                                                    </div>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={() => setOpen(false)}>İptal</Button>
                                                                    <Button onClick={handleSubmit}>Onayla</Button>
                                                                </DialogActions>
                                                            </Dialog>
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
                                                <GridContainer>
                                                    <StyledDataGrid
                                                        columns={[
                                                            {
                                                                field: 'registration_number', headerName: 'Sicil No', width: 100,
                                                                valueGetter: (params) => {
                                                                    const accountRelation = accountRelations.find((e) => e.account_id === params.row.$id)
                                                                    return accountRelation ? accountRelation.registration_number : " "
                                                                }
                                                            },
                                                            { field: 'email', headerName: 'E-posta', flex: 1 },
                                                            { field: 'name', headerName: 'Adı Soyadı', flex: 1 },
                                                            {
                                                                field: 'is_active', headerName: 'Aktiflik', width: 100, align: "center", renderCell: (params: any) => {
                                                                    const accountRelation = accountRelations.find((e) => e.account_id === params.row.$id)
                                                                    let circleRed = <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "red" }}>{" "}</div>
                                                                    let circleGreen = <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "green" }}>{" "}</div>
                                                                    return accountRelation ? accountRelation.is_active ? circleGreen : circleRed : circleRed
                                                                }
                                                            },
                                                            {
                                                                field: 'value', headerName: "İşlemler", width: 150,
                                                                renderCell: (params: any) => <Button variant="text" onClick={() => setEditAccount(params.row)}>Düzenle</Button>
                                                            }
                                                        ]}
                                                        rows={accounts.filter(account => accountRelations.some(relation => relation.account_id === account.$id && !relation.is_deleted))}
                                                        getRowId={(row) => row.$id} />
                                                </GridContainer>
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
                                                            label="Sicil No"
                                                            value={createAccountForm.registrationNumber}
                                                            onChange={(e) => setCreateAccount({ ...createAccountForm, registrationNumber: e.target.value })}
                                                            fullWidth
                                                            required
                                                        />
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
                                                        {
                                                            accountRelation.is_admin && selectedAccountRelationIsActive === false &&
                                                            <Button variant="contained" onClick={() => {
                                                                Swal.fire({
                                                                    title: 'Kullanıcıyı Sil',
                                                                    text: "Kullanıcıyı silmek istediğinizden emin misiniz? Bu işlemi geri alamazsınız!",
                                                                    icon: 'warning',
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: '#3085d6',
                                                                    cancelButtonColor: '#d33'
                                                                }).then(async (result) => {
                                                                    if (result.isConfirmed) {
                                                                        updateAccountRelation({
                                                                            databaseId: AppInfo.Database,
                                                                            collectionId: "account_relation",
                                                                            documentId: selectedAccountRelation.id,
                                                                            data: {
                                                                                ...removeDollarProperties(selectedAccountRelation),
                                                                                is_deleted: true,
                                                                                is_active: false
                                                                            }
                                                                        }, (data) => {
                                                                            Toast.fire({
                                                                                icon: 'success',
                                                                                title: 'Kullanıcı Silindi!'
                                                                            })
                                                                            setSelectedTab(1)
                                                                            setSelectedAccountRelation(resetAccountRelation)
                                                                            setSelectedAccountRelationIsActive(true)
                                                                            setSelectedAccount(resetMe);
                                                                        })
                                                                    }
                                                                })
                                                            }}>Kullanıcıyı Sil</Button>
                                                        }
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