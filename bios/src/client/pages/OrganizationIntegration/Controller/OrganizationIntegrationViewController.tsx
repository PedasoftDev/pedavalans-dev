import { Services, useGetMe } from "@realmocean/sdk";
import React, { useEffect, useState } from "react";
import { cLeading, cTop, cTopLeading, HStack, ReactView, ScrollView, Spinner, State, UIController, UINavigate, UIViewBuilder, useNavigate, VStack } from "@tuval/forms";
import { PortalMenu } from "../../../components/PortalMenu";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { Button, TextField } from "@mui/material";
import { Views } from "../../../components/Views";
import Collections from "../../../../server/core/Collections";
import AppInfo from "../../../../AppInfo";
import IOrganizationIntegration from "../../../interfaces/IOrganizationIntegration";
import OrganizationIntegration from "../../../../server/hooks/organizationIntegration/main";
import { ToastSuccess } from "../../../components/Toast";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";


const resetForm: IOrganizationIntegration = {
  body: "",
  link: "",
  response_data_attribute: "",
  id: "",
  id_number: "",
  first_name: "",
  last_name: "",
  title_id: "",
  title_name: "",
  position_id: "",
  position_name: "",
  workplace_id: "",
  workplace_name: "",
  line_id: "",
  line_name: "",
  manager_id: "",
  manager_name: "",
  department_id: "",
  department_name: "",
  job_start_date: "",
  photo: "",
  photo_type: "",
  birth_date: "",
  department_start_date: "",
  position_start_date: "",
  phone: "",
  email: "",
  gender: "",
  proxy_employee_id: "",
  educational_status: ""
}

export class OrganizationIntegrationViewController extends UIController {

  @State()
  private isLoading: boolean;

  private organizationIntegration: IOrganizationIntegration;

  protected BindRouterParams(): void {
    this.isLoading = true;
    Services.Databases.getDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationIntegration, OrganizationIntegration.documentId).then((res) => {
      this.organizationIntegration = res as any as IOrganizationIntegration;
      this.isLoading = false;
    }).catch(() => {
      this.isLoading = false;
    })
  }

  public LoadView() {

    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);

    const navigate = useNavigate();
    const { createOrganizationIntegration } = OrganizationIntegration.Create();
    const { updateOrganizationIntegration } = OrganizationIntegration.Update();

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
                if (this.organizationIntegration) {
                  updateOrganizationIntegration({
                    databaseId: AppInfo.Database,
                    collectionId: Collections.OrganizationIntegration,
                    documentId: OrganizationIntegration.documentId,
                    data: {
                      ...form,
                      tenant_id: me.prefs.organization
                    }
                  }, () => {
                    ToastSuccess("Başarılı", "Organizasyon entegrasyonu başarıyla güncellendi.");
                  })
                } else {
                  createOrganizationIntegration({
                    documentId: OrganizationIntegration.documentId,
                    data: {
                      ...form,
                      tenant_id: me.prefs.organization
                    }
                  }, () => {
                    ToastSuccess("Başarılı", "Organizasyon entegrasyonu başarıyla oluşturuldu.");
                  })
                }
              }

              useEffect(() => {
                if (this.organizationIntegration) {
                  setForm(removeDollarProperties(this.organizationIntegration));
                }
              }, [])

              return (
                HStack({ alignment: cTopLeading })(
                  PortalMenu("Organizasyon Entegrasyonu"),
                  VStack({ spacing: 15, alignment: cTopLeading })(
                    HStack({ alignment: cLeading })(
                      Views.Title("Organizasyon Entegrasyonu").paddingTop("10px")
                    ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                    ScrollView({ alignment: cTop, axes: "cVertical" })(
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
                            <h4>Entegrasyon Ayarları</h4>
                            <TextField
                              id="link"
                              fullWidth
                              label="Link"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.link}
                              onChange={handleChange}
                            />
                            <TextField
                              id="body"
                              fullWidth
                              label="Body"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.body}
                              multiline
                              rows={4}
                              onChange={handleChange}
                            />
                            <TextField
                              id="response_data_attribute"
                              fullWidth
                              label="Response Data Attribute"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.response_data_attribute}
                              onChange={handleChange}
                            />
                            <h4>Entegrasyon Parametreleri</h4>
                            <TextField
                              id="id"
                              fullWidth
                              label="Id - Sicil No"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.id}
                              onChange={handleChange}
                            />
                            <TextField
                              id="id_number"
                              fullWidth
                              label="Id Number - TC Kimlik No"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.id_number}
                              onChange={handleChange}
                            />
                            <TextField
                              id="first_name"
                              fullWidth
                              label="First Name - Ad"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.first_name}
                              onChange={handleChange}
                            />
                            <TextField
                              id="last_name"
                              fullWidth
                              label="Last Name - Soyad"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.last_name}
                              onChange={handleChange}
                            />
                            <TextField
                              id="title_id"
                              fullWidth
                              label="Title Id - Ünvan"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.title_id}
                              onChange={handleChange}
                            />
                            <TextField
                              id="title_name"
                              fullWidth
                              label="Title Name - Ünvan"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.title_name}
                              onChange={handleChange}
                            />
                            <TextField
                              id="position_id"
                              fullWidth
                              label="Position Id - Pozisyon"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.position_id}
                              onChange={handleChange}
                            />
                            <TextField
                              id="position_name"
                              fullWidth
                              label="Position Name - Pozisyon"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.position_name}
                              onChange={handleChange}
                            />
                            <TextField
                              id="workplace_id"
                              fullWidth
                              label="Workplace Id - İşyeri"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.workplace_id}
                              onChange={handleChange}
                            />
                            <TextField
                              id="workplace_name"
                              fullWidth
                              label="Workplace Name - İşyeri"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.workplace_name}
                              onChange={handleChange}
                            />
                            <TextField
                              id="line_id"
                              fullWidth
                              label="Line Id - Hat"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.line_id}
                              onChange={handleChange}
                            />
                            <TextField
                              id="line_name"
                              fullWidth
                              label="Line Name - Hat"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.line_name}
                              onChange={handleChange}
                            />
                            <TextField
                              id="manager_id"
                              fullWidth
                              label="Manager Id - Yönetici Sicil No"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.manager_id}
                              onChange={handleChange}
                            />
                            <TextField
                              id="manager_name"
                              fullWidth
                              label="Manager Name - Yönetici Adı"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.manager_name}
                              onChange={handleChange}
                            />
                            <TextField
                              id="department_id"
                              fullWidth
                              label="Department Id - Departman"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.department_id}
                              onChange={handleChange}
                            />
                            <TextField
                              id="department_name"
                              fullWidth
                              label="Department Name - Departman"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.department_name}
                              onChange={handleChange}
                            />
                            <TextField
                              id="photo"
                              fullWidth
                              label="Photo - Fotoğraf"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.photo}
                              onChange={handleChange}
                            />
                            <TextField
                              id="photo_type"
                              fullWidth
                              label="Photo Type - Fotoğraf Türü"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.photo_type}
                              onChange={handleChange}
                            />
                            <TextField
                              id="job_start_date"
                              fullWidth
                              label="Job Start Date - İşe Başlama Tarihi"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.job_start_date}
                              onChange={handleChange}
                            />
                            <TextField
                              id="birth_date"
                              fullWidth
                              label="Birth Date - Doğum Tarihi"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.birth_date}
                              onChange={handleChange}
                            />
                            <TextField
                              id="department_start_date"
                              fullWidth
                              label="Department Start Date - Departman Başlama Tarihi"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.department_start_date}
                              onChange={handleChange}
                            />
                            <TextField
                              id="position_start_date"
                              fullWidth
                              label="Position Start Date - Pozisyon Başlama Tarihi"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.position_start_date}
                              onChange={handleChange}
                            />
                            <TextField
                              id="phone"
                              fullWidth
                              label="Phone - Telefon"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.phone}
                              onChange={handleChange}
                            />
                            <TextField
                              id="email"
                              fullWidth
                              label="Email - E-Posta"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.email}
                              onChange={handleChange}
                            />
                            <TextField
                              id="gender"
                              fullWidth
                              label="Gender - Cinsiyet"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.gender}
                              onChange={handleChange}
                            />
                            <TextField
                              id="proxy_employee_id"
                              fullWidth
                              label="Proxy Employee Id - Vekil Sicil No"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.proxy_employee_id}
                              onChange={handleChange}
                            />
                            <TextField
                              id="educational_status"
                              fullWidth
                              label="Educational Status - Eğitim Durumu"
                              variant="outlined"
                              margin="normal"
                              size="small"
                              value={form.educational_status}
                              onChange={handleChange}
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