import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Views } from "../../../components/Views";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { FaAngleLeft } from "react-icons/fa";
import { Models, Query, Services, useGetMe, useListAccounts } from "@realmocean/sdk";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import { Resources } from "../../../assets/Resources";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import { Toast } from "../../../components/Toast";
import IAccountRelation from "../../../interfaces/IAccountRelation";
import { GridContainer } from "../Views/View";

export class AuthorizationProfileViewController extends UIController {

    public LoadView(): UIView {
        const { me, isLoading: isLoadingMe } = useGetMe("console");
        const navigate = useNavigate();
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts([Query.limit(10000)]);
        const { accountRelations: accountRel, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
        const { updateAccountRelation } = AccountRelation.Update();

        return (
            isLoadingMe || isLoadingAccounts || isLoadingResult ? VStack(Spinner()) :
                !accountRel[0].is_admin ? UINavigate("/dashboard") :
                    UIViewBuilder(() => {

                        const [isLoading, setIsLoading] = useState<boolean>(true);
                        const [accountRelations, setAccountRelations] = useState<IAccountRelation.IBase[]>([]);
                        const [accountList, setAccuntList] = useState<typeof accounts>([]);

                        const getAccountRelations = () => {
                            Promise.all([
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AccountRelation, [Query.limit(10000), Query.equal("is_deleted", false), Query.equal("is_active", true)]),
                            ]).then(res => {
                                const [accountRelationsDb] = res;
                                setAccountRelations(accountRelationsDb.documents as any);

                                const copyAcc = [];
                                accountRelationsDb.documents.forEach((item: any) => {
                                    const acc = accounts.find((x) => x.$id === item.account_id);
                                    if (acc) {
                                        copyAcc.push(acc);
                                    }
                                })
                                setAccuntList(copyAcc);
                                setIsLoading(false);
                            })

                        }

                        const handleChangeAuthorizationProfile = (id: string, authorization_profile: string) => {
                            const accountRelation = accountRelations.find((x) => x.account_id === id);
                            updateAccountRelation({
                                databaseId: AppInfo.Database,
                                collectionId: Collections.AccountRelation,
                                documentId: accountRelation.$id,
                                data: {
                                    authorization_profile
                                }
                            }, () => {
                                Toast.fire({
                                    icon: "success",
                                    title: "Yetki profili başarıyla güncellendi."
                                })
                                getAccountRelations();
                            })
                        };

                        const columns: GridColDef[] = [
                            {
                                field: 'name',
                                headerName: 'Adı Soyadı',
                                flex: 1,
                            },
                            {
                                field: 'email',
                                headerName: 'E-posta',
                                flex: 1,
                            },
                            {
                                field: 'authorization_profile',
                                headerName: 'Yetki Profili',
                                flex: 1,
                                renderCell(params) {
                                    const value = accountRelations.find((x) => x.account_id === params.row.$id)?.authorization_profile || "";

                                    return (
                                        <Autocomplete
                                            value={value}
                                            onChange={(event, newValue) => handleChangeAuthorizationProfile(params.row.$id, newValue)}
                                            options={Resources.AuthorizationProfile.map((item) => item.localStr)}
                                            getOptionLabel={(option) => Resources.AuthorizationProfile.find((item) => item.localStr === option)?.name || ""}
                                            renderInput={(params) => <TextField {...params} size="small" required />}
                                            fullWidth
                                            size="small"
                                        />
                                    );
                                },
                            }
                        ];


                        useEffect(() => {
                            getAccountRelations();
                        }, []);

                        return (isLoading ? VStack(Spinner()) :
                            VStack({ spacing: 15, alignment: cTopLeading })(
                                HStack({ alignment: cLeading, spacing: 10 })(
                                    VStack(
                                        ReactView(
                                            <IconButton onClick={() => navigate(-1)}>
                                                <FaAngleLeft size={18} />
                                            </IconButton>
                                        )
                                    ).height().width().paddingTop("10px"),
                                    Views.Title("Yetki Profilleri").paddingTop("10px")
                                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                HStack({ alignment: cTop })(
                                    ReactView(
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                            width: "100%",
                                        }}>
                                            <GridContainer>
                                                <StyledDataGrid
                                                    rows={accountList}
                                                    columns={columns}
                                                    getRowId={(row) => row.$id}
                                                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                />
                                            </GridContainer>
                                        </div>
                                    )
                                )
                            ).padding("0 20px")
                        )
                    })
        )
    }
}