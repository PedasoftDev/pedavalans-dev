import React, { useState, Fragment } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main';
import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate } from '@tuval/forms';
import { useDeleteCache, useGetMe } from '@realmocean/sdk';
import { Views } from '../../../../components/Views';
import { Form } from '../../Views/Views';
import { Resources } from '../../../../assets/Resources';
import AccountRelation from '../../../../../server/hooks/accountRelation/main';
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import { GridColDef, trTR } from '@mui/x-data-grid';
import IPositionRelationDepartments from '../../../../interfaces/IPositionRelationDepartments';
import PositionRelationDepartments from '../../../../../server/hooks/positionRelationDepartments/Main';


const formDepartmentState: IOrganizationStructure.IDepartments.ICreateDepartment = {
  id: "",
  record_id: "",
  name: "",
  parent_department_id: "",
  parent_department_name: "",
  tenant_id: "",
  realm_id: "",
}

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 4)?.link;

export class CreateDepartmentController extends UIController {

  public LoadView(): UIView {
    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);

    const navigate = useNavigate();
    return (
      isLoading || isLoadingPositions || isLoadingDepartments || isLoadingResult ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {
          const { deleteCache } = useDeleteCache("console")
          const [formDepartment, setFormDepartment] = useState(formDepartmentState);
          const { createDocument, error, isError } = OrganizationStructureDepartment.Create();
          const { createPositionRelationDepartments } = PositionRelationDepartments.Create();

          const [selectedPositions, setSelectedPositions] = useState([]);
          const [filterKey, setFilterKey] = useState("");
          const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterKey(e.target.value);
          }
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
            const departmentId = nanoid();
            createDocument({
              documentId: departmentId,
              data: {
                ...formDepartment,
                id: departmentId,
                tenant_id: me?.prefs?.organization,
              }
            }, () => {
              selectedPositions.forEach((position) => {
                const positionId = nanoid();
                const createForm: IPositionRelationDepartments.ICreate = {
                  id: positionId,
                  parent_department_id: departmentId,
                  parent_department_name: formDepartment.name,
                  relation_position_id: position.$id,
                  relation_position_name: position.name,
                }
                createPositionRelationDepartments({
                  documentId: positionId,
                  data: createForm
                }, () => {
                  Toast.fire({
                    icon: "success",
                    title: "Departman başarıyla eklendi!"
                  })
                  deleteCache();
                  navigate(link + "/list")
                })
              })
            })
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
          const columns: GridColDef[] = [
            {
              field: "name",
              headerName: "Pozisyon Adı",
              flex: 1
            }
          ];

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
                          <Autocomplete
                            value={
                              departments.find((department) => department.id === formDepartment.parent_department_id) || null
                            }
                            size='small'
                            onChange={
                              (event, newValue) => {
                                setFormDepartment({
                                  ...formDepartment,
                                  parent_department_id: newValue ? newValue.id : "",
                                  parent_department_name: newValue ? newValue.name : ""
                                })
                              }}
                            options={departments}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Bağlı Olduğu Departman" />}
                          />
                          <TextField placeholder="Pozisyon Arayın..." size="small" fullWidth onChange={handleSearch} />
                          <StyledDataGrid
                            rows={
                              positions.filter((item) => item.name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)
                            }
                            columns={columns}
                            getRowId={(row) => row.$id}
                            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                            isCellEditable={() => false}
                            disableRowSelectionOnClick
                            checkboxSelection
                            onRowSelectionModelChange={(newRowSelectionModel: any) => {
                              setSelectedPositions(newRowSelectionModel.map((item) => positions.find((position) => position.$id === item)))
                            }}
                            rowHeight={30}
                            columnHeaderHeight={30}
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