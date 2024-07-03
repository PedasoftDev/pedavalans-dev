import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate } from "@tuval/forms";
import AccountRelation from "../../../../../server/hooks/accountRelation/main";
import OrganizationStructureTitle from "../../../../../server/hooks/organizationStructureTitle/main";
import { useGetMe } from "@realmocean/sdk";
import { Views } from "../../../../components/Views";
import React, { useState } from "react";
import { Form } from "../../Views/Views";
import { TextField } from "@mui/material";
import { Resources } from "../../../../assets/Resources";
import { ToastError, ToastSuccess } from "../../../../components/Toast";

const resetFormTitle = {
  record_id: "",
  name: ""
}

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 1)?.link;

export class CreateTitleController extends UIController {

  public LoadView(): UIView {
    const navigate = useNavigate();
    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
    const { titles, isLoadingTitles } = OrganizationStructureTitle.GetList(me?.prefs?.organization)
    const { create } = OrganizationStructureTitle.Create()
    return (
      isLoading || isLoadingResult || isLoadingTitles ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {
          const [formTitle, setFormTitle] = useState(resetFormTitle)

          const onChange = (e: any) => {
            setFormTitle({ ...formTitle, [e.target.name]: e.target.value })
          }

          const onReset = () => {
            navigate(link + "/list")
          }

          const onSubmit = (e) => {
            e.preventDefault();
            if (titles.find((title) => title.record_id === formTitle.record_id)) {
              ToastError("Hata!", "Bu kayıt kodu zaten kullanılmakta!")
              return;
            }
            const id = nanoid()
            create({
              documentId: id,
              data: {
                ...formTitle,
                id
              }
            }, () => {
              ToastSuccess("Başarılı!", "Ünvan başarıyla oluşturuldu!")
              onReset()
            })
          }

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
                        </div>
                      }
                      buttons={[
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