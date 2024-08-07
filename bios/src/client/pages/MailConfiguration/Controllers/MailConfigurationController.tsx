import { useGetMe } from "@realmocean/sdk";
import React from "react";
import { cLeading, cTop, cTopLeading, HStack, ReactView, Spinner, UIController, UINavigate, UIViewBuilder, useNavigate, VStack } from "@tuval/forms";
import { PortalMenu } from "../../../components/PortalMenu";
import styled from "styled-components";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { Views } from "../../../components/Views";

const Main = styled.main`
  -webkit-box-flex: 1;
  flex-grow: 1;
  height: 100wh;
  width: calc(100vw - 310.50px);
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media (max-width: 1200px) {
    width: 100vw;
  }
`;

export class MailConfigurationController extends UIController {

  public LoadView() {

    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);

    const navigate = useNavigate();

    return (
      isLoading || isLoadingResult ? VStack(Spinner()) :
        me == null ? UINavigate("/login") :
          accountRelations[0].is_admin == false ? UINavigate("/dashboard") :
            UIViewBuilder(() => {

              return (
                HStack({ alignment: cTopLeading })(
                  PortalMenu("Mail Konfigürasyonu"),
                  VStack({ spacing: 15, alignment: cTopLeading })(
                    HStack({ alignment: cLeading })(
                      Views.Title("Mail Konfigürasyonu").paddingTop("10px")
                    ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                    HStack({ alignment: cTop })(
                      ReactView(
                        <div style={{
                          display: "flex",
                          gap: "10px",
                          width: "100%",
                          justifyContent: "center",
                        }}>
                          <form style={{
                            width: "60%"
                          }}>
                            <TextField
                              fullWidth
                              label="SMTP Server"
                              variant="outlined"
                              margin="normal"
                              size="small"
                            />
                            <TextField
                              fullWidth
                              label="SMTP Port"
                              variant="outlined"
                              margin="normal"
                              size="small"
                            />
                            <TextField
                              fullWidth
                              label="SMTP Username"
                              variant="outlined"
                              margin="normal"
                              size="small"
                            />
                            <TextField
                              fullWidth
                              label="SMTP Password"
                              variant="outlined"
                              margin="normal"
                              type="password"
                              size="small"
                            />
                            <FormControlLabel
                              sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
                              onChange={(e: any) => { }}
                              control={<Switch color="primary" />}
                              label="TLS"
                              labelPlacement="start"
                            />

                          </form>
                        </div>
                      )
                    )
                  )
                ).backgroundColor("white")

              )
            })
    )
  }
}