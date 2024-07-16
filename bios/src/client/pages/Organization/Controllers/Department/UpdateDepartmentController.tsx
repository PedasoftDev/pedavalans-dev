import React, { useState, Fragment, useEffect } from 'react';
import { Autocomplete, FormControlLabel, Switch, TextField } from '@mui/material';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main';
import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate, useParams } from '@tuval/forms';
import { useDeleteCache, useGetMe } from '@realmocean/sdk';
import { Views } from '../../../../components/Views';
import { Form } from '../../Views/Views';
import { Resources } from '../../../../assets/Resources';
import AccountRelation from '../../../../../server/hooks/accountRelation/main';
import { PedavalansServiceBroker } from '../../../../../server/brokers/PedavalansServiceBroker';
import AppInfo from '../../../../../AppInfo';
import Swal from 'sweetalert2';
import removeDollarProperties from '../../../../assets/Functions/removeDollarProperties';
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import { GridColDef, trTR } from '@mui/x-data-grid';
import PositionRelationDepartments from '../../../../../server/hooks/positionRelationDepartments/Main';
import Collections from '../../../../../server/core/Collections';
import { is } from '@tuval/core';

interface IFormDepartment {
  id: string;
  record_id: string;
  name: string;
  parent_department_id: string;
  parent_department_name: string;
  is_active: boolean;
}

const formDepartmentState: IFormDepartment = {
  id: "",
  record_id: "",
  name: "",
  parent_department_id: "",
  parent_department_name: "",
  is_active: true
}

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 4)?.link;

export class UpdateDepartmentController extends UIController {

  public LoadView(): UIView {

    const { id } = useParams();
    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);

    const { document, isLoading: isLoadingDepartment } = OrganizationStructureDepartment.Get(id)
    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
    const { updateDocument } = OrganizationStructureDepartment.Update();
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);
    const { positionRelationDepartmentsByDepartment, isLoading: isLoadingPositionRelationDepartments } = PositionRelationDepartments.ListByDepartments(id);
    const { updatePositionRelationDepartments } = PositionRelationDepartments.Update();
    const { createPositionRelationDepartments } = PositionRelationDepartments.Create()
    const [positionsForm, setPositionsForm] = useState<string[]>([]);
    const [selectedPositions, setSelectedPositions] = useState<any[]>([]);
    const { deleteCache } = useDeleteCache(AppInfo.Name);

    const navigate = useNavigate();
    return (
      isLoading || isLoadingPositions || isLoadingDepartments || isLoadingPositionRelationDepartments || isLoadingDepartment || isLoadingResult ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {

          const [formDepartment, setFormDepartment] = useState(formDepartmentState);
          const [isActive, setIsActive] = useState(document.is_active);
          const [filterKey, setFilterKey] = useState("");
          const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterKey(e.target.value);
          }
          const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (departments.some((department) => department.record_id == formDepartment.record_id && department.id != formDepartment.id)) {
              Toast.fire({
                icon: "error",
                title: "Departman eklenirken bir hata oluştu!",
                text: "Departman kodu zaten kullanılmaktadır."
              })
              return;
            }
            let isNameChanged = document.name != formDepartment.name;
            updateDocument({
              databaseId: AppInfo.Database,
              collectionId: "organization_department",
              documentId: id,
              data: formDepartment
            }, () => {
              positionRelationDepartmentsByDepartment.forEach((position) => {
                updatePositionRelationDepartments({
                  databaseId: AppInfo.Database,
                  collectionId: Collections.PositionRelationDepartments,
                  documentId: position.$id,
                  data: {
                    is_deleted: true,
                    is_active: false
                  }
                })
                positionsForm.forEach((positionId) => {
                  const nanoId = nanoid();
                  createPositionRelationDepartments({
                    documentId: nanoId,
                    data: {
                      id: nanoId,
                      parent_department_id: formDepartment.id,
                      parent_department_name: formDepartment.name,
                      relation_position_id: positionId,
                      relation_position_name: positions.find((item) => item.id === positionId)?.name,
                      is_active: true,
                      is_deleted: false
                    }
                  })
                })
              })
              if (isNameChanged) {
                PedavalansServiceBroker.Default.updateCompetencyDepartmentNames(formDepartment.id, formDepartment.name).then(() => {
                  Toast.fire({
                    icon: "success",
                    title: "Departman başarıyla güncellendi!",
                  })
                  deleteCache()
                  onReset();
                })
              } else {
                Toast.fire({
                  icon: "success",
                  title: "Departman başarıyla güncellendi!",
                })
                deleteCache();
                onReset();
              }
            })
          }


          const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormDepartment({ ...formDepartment, [e.target.name]: e.target.value });
          }

          const onReset = () => {
            navigate(link + "/list")
          }

          const onDelete = () => {
            Swal.fire({
              title: "Departman Silme",
              text: `${formDepartment.name} adlı Departman silinecek!`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Evet, sil!",
              cancelButtonText: "Hayır, iptal et!"
            }).then((result) => {
              if (!result.isConfirmed) {
                return;
              }
              updateDocument({
                databaseId: AppInfo.Database,
                collectionId: "organization_department",
                documentId: formDepartment.id,
                data: {
                  ...formDepartment,
                  is_deleted: true
                }
              }, () => {
                Toast.fire({
                  icon: "info",
                  title: "Departman başarıyla silindi!",
                  text: "Departman başarıyla silindi."
                })
                deleteCache()
                onReset();
              })
            })
          }
          const columns: GridColDef[] = [
            {
              field: "name",
              headerName: "Pozisyon Adı",
              flex: 1
            }
          ];

          useEffect(() => {
            if (document) {
              setFormDepartment(removeDollarProperties(document));
              setIsActive(document.is_active);
            }
            setPositionsForm(positionRelationDepartmentsByDepartment.map((item) => item.relation_position_id));
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
                      title='Departman Tanımını Düzenleyin'
                      onSubmit={onSubmit}
                      formContent={
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>

                          <TextField
                            name='record_id'
                            size='small'
                            label='Kayıt Kodu'
                            value={formDepartment.record_id}
                            onChange={onChange}
                          />

                          <TextField
                            name='name'
                            size='small'
                            label='Departman Adı'
                            value={formDepartment.name}
                            onChange={onChange}
                          />
                          <Autocomplete
                            size='small'
                            value={
                              departments.find((department) => department.id === formDepartment.parent_department_id) || null
                            }
                            onChange={
                              (event, newValue) => {
                                setFormDepartment({
                                  ...formDepartment,
                                  parent_department_id: newValue ? newValue.id : "",
                                  parent_department_name: newValue ? newValue.name : ""
                                })
                              }}
                            options={departments.reduce(
                              (acc, current) => {
                                const x = acc.find((item) => item.parent_department_id === current.parent_department_id);
                                if (!x) {
                                  return acc.concat([current]);
                                } else {
                                  return acc;
                                }
                              }, []
                            ).filter((department) => department.id !== formDepartment.id)}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Bağlı Olduğu Departman" />}
                          />
                          <TextField placeholder="Pozisyon Arayın..." size="small" fullWidth onChange={handleSearch} />
                          <StyledDataGrid
                            rows={
                              positions.filter((item) => item.name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)
                            }
                            columns={columns}
                            onRowSelectionModelChange={(newRowSelectionModel: any) => {
                              setPositionsForm(newRowSelectionModel)
                            }}
                            rowSelectionModel={positionsForm}
                            getRowId={(row) => row.$id}
                            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                            isCellEditable={() => false}
                            disableRowSelectionOnClick
                            checkboxSelection
                            rowHeight={30}
                            columnHeaderHeight={30}
                          />
                          <FormControlLabel
                            sx={{ width: "100%", alignContent: "end" }}
                            onChange={(e: any) => setFormDepartment({ ...formDepartment, is_active: e.target.checked })}
                            value={formDepartment.is_active}
                            control={<Switch color="primary" checked={formDepartment.is_active} />}
                            label="Aktif mi?"
                            labelPlacement="start"
                          />
                        </div>
                      }
                      buttons={
                        isActive ?
                          [
                            {
                              text: "Güncelle",
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
                          ]
                      }
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