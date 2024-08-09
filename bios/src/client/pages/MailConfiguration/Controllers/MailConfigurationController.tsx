import { Services, useGetMe } from "@realmocean/sdk";
import React, { useEffect, useState } from "react";
import { cLeading, cTop, cTopLeading, HStack, ReactView, Spinner, State, UIController, UINavigate, UIViewBuilder, useNavigate, VStack } from "@tuval/forms";
import { PortalMenu } from "../../../components/PortalMenu";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { Views } from "../../../components/Views";
import MailSettings from "../../../../server/hooks/mailSettings/main";
import IMailSettings from "../../../interfaces/IMailSettings";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import Collections from "../../../../server/core/Collections";
import AppInfo from "../../../../AppInfo";
import { Toast } from "../../../components/Toast";
import encrypt from "../../../assets/Functions/encrypt";
import decrypt from "../../../assets/Functions/decrypt";


const resetForm: IMailSettings = {
  smtp_server: "",
  smtp_port: "",
  username: "",
  password: "",
  tls: false
}

export class MailConfigurationController extends UIController {

  @State()
  private isLoading: boolean;

  private mailSettings: IMailSettings;

  protected BindRouterParams(): void {
    this.isLoading = true;
    Services.Databases.getDocument(AppInfo.Name, AppInfo.Database, Collections.MailSettings, MailSettings.documentId).then((res) => {
      this.mailSettings = res as any as IMailSettings;
      this.isLoading = false;
    }).catch(() => {
      this.isLoading = false;
    })
  }

  public LoadView() {

    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
    const { updateMailSettings } = MailSettings.Update();
    const { createMailSettings } = MailSettings.Create();

    const navigate = useNavigate();

    return (
      this.isLoading || isLoading || isLoadingResult ? VStack(Spinner()) :
        me == null ? UINavigate("/login") :
          accountRelations[0].is_admin == false ? UINavigate("/dashboard") :
            UIViewBuilder(() => {

              const [form, setForm] = useState(resetForm);

              const handleChange = (e: any) => {
                setForm({ ...form, [e.target.id]: e.target.value });
              }

              const handleSubmit = (e: any) => {
                e.preventDefault();
                const success = () => {
                  Toast.fire({
                    icon: "success",
                    title: "Mail Konfigürasyonu başarıyla güncellendi."
                  })
                  navigate("/app/parameters")
                }

                if (this.mailSettings) {
                  updateMailSettings({
                    collectionId: Collections.MailSettings,
                    databaseId: AppInfo.Database,
                    documentId: MailSettings.documentId,
                    data: {
                      ...form,
                      password: encrypt(form.password)
                    }
                  }, () => {
                    success()
                  })
                } else {
                  createMailSettings({
                    documentId: MailSettings.documentId,
                    data: {
                      ...form,
                      password: encrypt(form.password)
                    }
                  }, () => {
                    success()
                  })
                }
              }

              useEffect(() => {
                if (this.mailSettings) {
                  setForm({ ...removeDollarProperties(this.mailSettings), password: "" });
                }
              }, [])

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
                          <form
                            onSubmit={handleSubmit}
                            style={{
                              width: "60%"
                            }}>
                            <TextField
                              id="smtp_server"
                              fullWidth
                              label="SMTP Server"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.smtp_server}
                              onChange={handleChange}
                            />
                            <TextField
                              id="smtp_port"
                              fullWidth
                              label="SMTP Port"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.smtp_port}
                              onChange={handleChange}
                            />
                            <TextField
                              id="username"
                              fullWidth
                              label="SMTP Username"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.username}
                              onChange={handleChange}
                            />
                            <TextField
                              id="password"
                              fullWidth
                              label="SMTP Password"
                              variant="outlined"
                              margin="normal"
                              type="password"
                              size="small"
                              value={form.password}
                              onChange={handleChange}
                            />
                            <FormControlLabel
                              sx={{ width: "100%", alignContent: "start", padding: "0 5px 0 0" }}
                              onChange={(e: any) => { setForm({ ...form, tls: e.target.checked }) }}
                              control={<Switch color="primary" checked={form.tls} />}
                              label="TLS"
                              labelPlacement="start"
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              size="small"
                              type="submit"
                              style={{ marginBottom: "10px" }}
                            >
                              Kaydet
                            </Button>
                            <Button
                              variant="contained"
                              color="inherit"
                              fullWidth
                              size="small"
                              onClick={() => {
                                navigate("/app/parameters")
                              }}
                            >
                              Geri Dön
                            </Button>
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