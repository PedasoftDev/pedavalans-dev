import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Views } from "../../../components/Views";
import { FormControl, IconButton, MenuItem, Select, } from "@mui/material";
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
        const navigate = useNavigate();
        const [isLoading, setIsLoading] = useState(true);
        const [accountRelations, setAccountRelations] = useState<IAccountRelation.IBase[]>([]);
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts();
        const { updateAccountRelation } = AccountRelation.Update();

        const getAccountRelations = () => {
            Services.Accounts.get().then((me) => {
                Promise.all([
                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AccountRelation, [Query.limit(10000), Query.equal("tenant_id", me.prefs.organization), Query.equal("is_deleted", false)]),
                ]).then(res => {
                    const [accountRelationsDb] = res;
                    setAccountRelations(accountRelationsDb.documents as any);
                    setIsLoading(false);
                })
            });
        }

        useEffect(() => {
            getAccountRelations();
        }, [])

        return (
            isLoading || isLoadingAccounts ? VStack(Spinner()) :
                !accountRelations[0].is_admin ? UINavigate("/dashboard") :
                    UIViewBuilder(() => {

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
                                    return (
                                        <FormControl fullWidth size="small">
                                            <Select
                                                value={accountRelations.find((x) => x.account_id === params.row.$id)?.authorization_profile || ""}
                                                onChange={(e) => handleChangeAuthorizationProfile(params.row.$id, e.target.value)}
                                                size="small"
                                                required
                                            >
                                                {Resources.AuthorizationProfile.map((item) => (
                                                    <MenuItem key={item.localStr} value={item.localStr}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )
                                },
                            }
                        ];

                        return (
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
                                                    rows={accounts}
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