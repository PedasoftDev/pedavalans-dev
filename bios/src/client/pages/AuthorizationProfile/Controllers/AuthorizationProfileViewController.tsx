import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React from "react";
import { Views } from "../../../components/Views";
import { IconButton, } from "@mui/material";
import { FaAngleLeft } from "react-icons/fa";
import { useGetMe, useListAccounts } from "@realmocean/sdk";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";

export class AuthorizationProfileViewController extends UIController {

    public LoadView(): UIView {
        const navigate = useNavigate();
        const { isLoading, me } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts();

        return (
            isLoading || isLoadingResult || isLoadingAccounts ? VStack(Spinner()) :
                !accountRelations[0].is_admin ? UINavigate("/dashboard") :
                    UIViewBuilder(() => {

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
                                field: 'role',
                                headerName: 'Rol',
                                flex: 1,
                                renderCell(params) {
                                    return (
                                        <div>
                                            yetki profili
                                        </div>
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
                                            <div style={{ height: "calc(100vh - 150px)", width: "calc(100vw - 330px)" }}>
                                                <StyledDataGrid
                                                    rows={accounts}
                                                    columns={columns}
                                                    getRowId={(row) => row.$id}
                                                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                />
                                            </div>
                                        </div>
                                    )
                                )
                            ).padding("0 20px")
                        )
                    })
        )
    }
}