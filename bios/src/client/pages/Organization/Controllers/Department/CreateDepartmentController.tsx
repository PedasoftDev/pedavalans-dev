import React, { useState, Fragment } from 'react';
import { TextField } from '@mui/material';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main';
import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate } from '@tuval/forms';
import { useGetMe } from '@realmocean/sdk';
import { Views } from '../../../../components/Views';
import { Form } from '../../Views/Views';
import { Resources } from '../../../../assets/Resources';
import AccountRelation from '../../../../../server/hooks/accountRelation/main';


const formDepartmentState: IOrganizationStructure.IDepartments.ICreateDepartment = {
  id: "",
  record_id: "",
  name: "",
  tenant_id: "",
  realm_id: "",
}

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 4)?.link;

export class CreateDepartmentController extends UIController {

  public LoadView(): UIView {
    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);

    const navigate = useNavigate();
    return (
      isLoading || isLoadingDepartments || isLoadingResult ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {

          const [formDepartment, setFormDepartment] = useState(formDepartmentState);
          const { createDocument, error, isError } = OrganizationStructureDepartment.Create();



          const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (departments.some((document) => document.record_id == formDepartment.record_id)) {
              Toast.fire({
                icon: "error",
                title: "Departman eklenirken bir hata oluştu!",
                text: "Departman kodu zaten kullanılmaktadır."
              })
              return;
            }
            const id = nanoid();
            createDocument({
              documentId: id,
              data: {
                ...formDepartment,
                id: id,
                tenant_id: me?.prefs?.organization
              }
            }, () => {
              Toast.fire({
                icon: "success",
                title: "Departman başarıyla eklendi!",
              })
              onReset();

            });
            if (isError) {
              Toast.fire({
                icon: "error",
                title: "Departman eklenirken bir hata oluştu!",
                text: error?.message
              })
            }
          }

          const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormDepartment({ ...formDepartment, [e.target.name]: e.target.value });
          }

          const onReset = () => {
            navigate(link + "/list")
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
                      title='Yeni Departman Tanımlayın'
                      onSubmit={onSubmit}
                      formContent={

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                          <TextField
                            name='record_id'
                            size='small'
                            label='Kayıt Kodu'
                            value={formDepartment.record_id}
                            onChange={onChange}
                            required
                          />
                          <TextField
                            name='name'
                            size='small'
                            label='Departman Adı'
                            value={formDepartment.name}
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