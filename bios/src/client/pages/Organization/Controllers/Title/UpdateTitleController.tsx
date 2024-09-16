import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate, useParams } from "@tuval/forms";
import AccountRelation from "../../../../../server/hooks/accountRelation/main";
import OrganizationStructureTitle from "../../../../../server/hooks/organizationStructureTitle/main";
import { useGetMe } from "@realmocean/sdk";
import { Views } from "../../../../components/Views";
import React, { useEffect, useState } from "react";
import { Form } from "../../Views/Views";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { Resources } from "../../../../assets/Resources";
import { ToastError, ToastSuccess } from "../../../../components/Toast";
import { IOrganizationStructure } from "../../../../interfaces/IOrganizationStructure";
import AppInfo from "../../../../../AppInfo";
import removeDollarProperties from "../../../../assets/Functions/removeDollarProperties";
import Swal from "sweetalert2";

const resetFormTitle: IOrganizationStructure.ITitles.ITitle = {
  record_id: "",
  name: "",
  id: "",
  is_active: true,
  is_deleted: false,
  realm_id: "",
  tenant_id: "",
}

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 1)?.link;

export class UpdateTitleController extends UIController {

  public LoadView(): UIView {

    const navigate = useNavigate();
    const { me, isLoading } = useGetMe("console");
    const { id } = useParams()
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
    const { titles, isLoadingTitles } = OrganizationStructureTitle.GetList(me?.prefs?.organization)
    const { update } = OrganizationStructureTitle.Update()
    const { title, isLoadingTitle } = OrganizationStructureTitle.Get(id)

    return (
      isLoading || isLoadingResult || isLoadingTitles || isLoadingTitle ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {

          const [formTitle, setFormTitle] = useState(resetFormTitle)
          const [isActive, setIsActive] = useState(true)

          const onChange = (e: any) => {
            setFormTitle({ ...formTitle, [e.target.name]: e.target.value })
          }

          const onReset = () => {
            navigate(link + "/list")
          }

          const onSubmit = (e) => {
            e.preventDefault();
            if (titles.find((title) => title.record_id === formTitle.record_id && title.$id !== id)) {
              ToastError("Hata!", "Bu kayıt kodu zaten kullanılmakta!")
              return;
            }
            update({
              databaseId: AppInfo.Database,
              collectionId: "organization_title",
              documentId: id,
              data: {
                ...removeDollarProperties(formTitle)
              }
            }, () => {
              ToastSuccess("Başarılı!", "Ünvan başarıyla güncellendi!")
              onReset()
            })
          }

          const onDelete = () => {
            Swal.fire({
              title: 'Emin misiniz?',
              text: "Bu işlem geri alınamaz!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Evet, sil!',
              cancelButtonText: 'İptal',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33'
            }).then((result) => {
              if (result.isConfirmed) {
                update({
                  databaseId: AppInfo.Database,
                  collectionId: "organization_title",
                  documentId: id,
                  data: {
                    ...removeDollarProperties(formTitle),
                    is_deleted: true,
                    is_active: false
                  }
                }, () => {
                  ToastSuccess("Başarılı!", "Ünvan başarıyla silindi!")
                  onReset()
                })
              }
            })

          }

          useEffect(() => {
            if (title) {
              setFormTitle(title)
              setIsActive(title.is_active)
            }
          }, [])

          return (
            VStack({ alignment: cTop })(
              HStack({ alignment: cLeading })(
                Views.Title("Organizasyon Yapısı").paddingTop("20px")
              ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
              VStack({ alignment: cTop })(
                ReactView(
                  <div style={{ width: "100%", height: "100%" }}>
                    <Form
                      title='Yeni Ünvan Tanımlayın'
                      onSubmit={onSubmit}
                      formContent={
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                          <TextField
                            name='record_id'
                            size='small'
                            label='Kayıt Kodu'
                            value={formTitle.record_id}
                            onChange={onChange}
                            required
                          />
                          <TextField
                            name='name'
                            size='small'
                            label='Ünvan Adı'
                            value={formTitle.name}
                            onChange={onChange}
                            required
                          />
                          <FormControlLabel
                            sx={{ width: "100%", alignContent: "end" }}
                            onChange={(e: any) => setFormTitle({ ...formTitle, is_active: e.target.checked })}
                            value={formTitle.is_active}
                            control={<Switch color="primary" checked={formTitle.is_active} />}
                            label="Aktif mi?"
                            labelPlacement="start"
                          />
                        </div>
                      }
                      buttons={isActive ?
                        [
                          {
                            text: "Kaydet",
                            color: "primary",
                            type: "submit"
                          },
                          {
                            text: "İptal",
                            color: "error",
                            type: "button",
                            onClick: onReset
                          }
                        ]
                        :
                        [
                          {
                            text: "Güncelle",
                            color: "primary",
                            type: "submit"
                          },
                          {
                            text: "Sil",
                            color: "error",
                            onClick: onDelete
                          },
                          {
                            text: "İptal",
                            color: "primary",
                            type: "button",
                            onClick: onReset
                          }
                        ]}
                    />
                  </div>

                )
              ).paddingTop("10px")
            ).padding("0 10px 0 20px")
          )
        })
    )
  }
}