import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate, useParams } from "@tuval/forms";
import AccountRelation from "../../../../../server/hooks/accountRelation/main";
import OrganizationStructurePosition from "../../../../../server/hooks/organizationStructrePosition/main";
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

const resetFormPosition: IOrganizationStructure.IPositions.IPosition = {
  record_id: "",
  name: "",
  id: "",
  is_active: true,
  is_deleted: false,
  realm_id: "",
  tenant_id: "",
}

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 2)?.link;

export class UpdatePositionController extends UIController {

  public LoadView(): UIView {

    const navigate = useNavigate();
    const { me, isLoading } = useGetMe("console");
    const { id } = useParams()
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)
    const { update } = OrganizationStructurePosition.Update()
    const { position, isLoadingPosition } = OrganizationStructurePosition.Get(id)

    return (
      isLoading || isLoadingResult || isLoadingPositions || isLoadingPosition ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {

          const [formPosition, setFormPosition] = useState(resetFormPosition)
          const [isActive, setIsActive] = useState(true)

          const onChange = (e: any) => {
            setFormPosition({ ...formPosition, [e.target.name]: e.target.value })
          }

          const onReset = () => {
            navigate(link + "/list")
          }

          const onSubmit = (e) => {
            e.preventDefault();
            if (positions.find((position) => position.record_id === formPosition.record_id && position.$id !== id)) {
              ToastError("Hata!", "Bu kayıt kodu zaten kullanılmakta!")
              return;
            }
            update({
              databaseId: AppInfo.Database,
              collectionId: "organization_position",
              documentId: id,
              data: {
                ...removeDollarProperties(formPosition)
              }
            }, () => {
              ToastSuccess("Başarılı!", "Pozisyon başarıyla güncellendi!")
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
            }).then((result) => {
              if (result.isConfirmed) {
                update({
                  databaseId: AppInfo.Database,
                  collectionId: "organization_position",
                  documentId: id,
                  data: {
                    ...removeDollarProperties(formPosition),
                    is_deleted: true,
                    is_active: false
                  }
                }, () => {
                  ToastSuccess("Başarılı!", "Pozisyon başarıyla silindi!")
                  onReset()
                })
              }
            })

          }

          useEffect(() => {
            if (position) {
              setFormPosition(position)
              setIsActive(position.is_active)
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
                      title='Pozisyon Bilgilerini Güncelleyin'
                      onSubmit={onSubmit}
                      formContent={
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                          <TextField
                            name='record_id'
                            size='small'
                            label='Kayıt Kodu'
                            value={formPosition.record_id}
                            onChange={onChange}
                            required
                          />
                          <TextField
                            name='name'
                            size='small'
                            label='Pozisyon Adı'
                            value={formPosition.name}
                            onChange={onChange}
                            required
                          />
                          <FormControlLabel
                            sx={{ width: "100%", alignContent: "end" }}
                            onChange={(e: any) => setFormPosition({ ...formPosition, is_active: e.target.checked })}
                            value={formPosition.is_active}
                            control={<Switch color="primary" checked={formPosition.is_active} />}
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