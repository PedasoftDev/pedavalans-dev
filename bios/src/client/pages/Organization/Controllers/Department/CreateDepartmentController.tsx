import React, { useState, Fragment, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main';
import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate } from '@tuval/forms';
import { Query, Services, useDeleteCache, useGetMe } from '@realmocean/sdk';
import { Views } from '../../../../components/Views';
import { Form } from '../../Views/Views';
import { Resources } from '../../../../assets/Resources';
import AccountRelation from '../../../../../server/hooks/accountRelation/main';
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import { GridColDef, trTR } from '@mui/x-data-grid';
import IPositionRelationDepartments from '../../../../interfaces/IPositionRelationDepartments';
import PositionRelationDepartments from '../../../../../server/hooks/positionRelationDepartments/Main';
import AppInfo from '../../../../../AppInfo';
import Collections from '../../../../../server/core/Collections';
import OrganizationStructureWorkPlace from '../../../../../server/hooks/organizationStructureWorkPlace/main';
import IRelatedDepartmentsWorkPlaces from '../../../../interfaces/IRelatedDepartmentsWorkPlaces';
import RelatedDepartmentsWorkPlaces from '../../../../../server/hooks/relatedDepartmentsWorkPlaces/Main';


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
    const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);

    const navigate = useNavigate();
    return (
      isLoading || isLoadingPositions || isLoadingWorkPlace || isLoadingDepartments || isLoadingResult ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {
          const { deleteCache } = useDeleteCache("console")
          const [formDepartment, setFormDepartment] = useState(formDepartmentState);
          const [formWorkPlace, setFormWorkPlace] = useState([]);
          const [positionRelationDepartmentsState, setPositionRelationDepartmentsState] = useState<boolean>(false);
          const { createDocument, error, isError } = OrganizationStructureDepartment.Create();
          const { createPositionRelationDepartments } = PositionRelationDepartments.Create();
          const { createRelatedDepartmentsWorkPlaces } = RelatedDepartmentsWorkPlaces.Create();

          const [selectedPositions, setSelectedPositions] = useState([]);
          const [filterKey, setFilterKey] = useState("");
          const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);


          const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterKey(e.target.value);
          }
          // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          //   e.preventDefault();
          //   if (departments.some((document) => document.record_id == formDepartment.record_id)) {
          //     Toast.fire({
          //       icon: "error",
          //       title: "Departman eklenirken bir hata oluştu!",
          //       text: "Departman kodu zaten kullanılmaktadır."
          //     })
          //     return;
          //   }
          //   const departmentId = nanoid();
          //   createDocument({
          //     documentId: departmentId,
          //     data: {
          //       ...formDepartment,
          //       id: departmentId,
          //       tenant_id: me?.prefs?.organization,
          //     }
          //   }, () => {
          //     selectedPositions.forEach((position) => {
          //       const positionId = nanoid();
          //       const createForm: IPositionRelationDepartments.ICreate = {
          //         id: positionId,
          //         parent_department_id: departmentId,
          //         parent_department_name: formDepartment.name,
          //         relation_position_id: position.$id,
          //         relation_position_name: position.name,
          //       }
          //       createPositionRelationDepartments({
          //         documentId: positionId,
          //         data: createForm
          //       }, () => {
          //         Toast.fire({
          //           icon: "success",
          //           title: "Departman başarıyla eklendi!"
          //         })
          //         deleteCache();
          //         navigate(link + "/list")
          //       })
          //     })
          //   })
          //   if (isError) {
          //     Toast.fire({
          //       icon: "error",
          //       title: "Departman eklenirken bir hata oluştu!",
          //       text: error?.message
          //     })
          //   }
          // }
          const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (departments.some((document) => document.record_id == formDepartment.record_id)) {
              Toast.fire({
                icon: "error",
                title: "Departman eklenirken bir hata oluştu!",
                text: "Departman kodu zaten kullanılmaktadır."
              })
              return;
            }

            try {
              const departmentId = nanoid();
              await createDocument({
                documentId: departmentId,
                data: {
                  ...formDepartment,
                  id: departmentId,
                  tenant_id: me?.prefs?.organization,
                }
              });

              for (const position of selectedPositions) {
                const positionId = nanoid();
                const createForm: IPositionRelationDepartments.ICreate = {
                  id: positionId,
                  parent_department_id: departmentId,
                  parent_department_name: formDepartment.name,
                  relation_position_id: position.$id,
                  relation_position_name: position.name,
                }

                await createPositionRelationDepartments({
                  documentId: positionId,
                  data: createForm
                });
              }

              for (const item of formWorkPlace) {
                const relatedDepId = nanoid();
                const createForm: IRelatedDepartmentsWorkPlaces.ICreate = {
                  id: relatedDepId,
                  related_department_id: departmentId,
                  related_department_record_id: formDepartment.record_id,
                  workplace_id: item.id,
                  workplace_record_id: item.record_id,
                }
                await createRelatedDepartmentsWorkPlaces({
                  documentId: relatedDepId,
                  data: createForm
                })
              }
              Toast.fire({
                icon: "success",
                title: "Departman başarıyla eklendi!"
              });

              deleteCache();
              navigate(link + "/list");
            } catch (error) {
              console.log(error);
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
          useEffect(() => {
            Services.Databases.listDocuments(
              AppInfo.Name,
              AppInfo.Database,
              Collections.Parameter,
              [
                Query.equal("name", "position_relation_department"),
                Query.limit(10000),
              ]
            ).then((res) => {
              setPositionRelationDepartmentsState(res.documents[0]?.is_active)
            }).then(() => {
              Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.Parameter,
                [
                  Query.equal("name", "work_place_definition"),
                  Query.limit(10000),
                ]
              ).then((res) => {
                setWorkPlaceDefination(res.documents[0]?.is_active)
              })
            })
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
                          {
                            workPlaceDefination ? (<Autocomplete
                              size='small'
                              multiple
                              onChange={
                                (event, newValue) => {
                                  setFormWorkPlace(newValue)
                                }}
                              options={workPlaces.filter((item) => item.is_active === true)}
                              value={formWorkPlace}
                              getOptionLabel={(option) => option.record_id + " - " + option.name}
                              renderInput={(params) => <TextField {...params} required={formWorkPlace.length === 0} label="Bağlı Olduğu İşyeri" />}
                            />)
                              : null
                          }
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
                            options={departments.filter((item) => item.is_active === true)}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Bağlı Olduğu Departman" />}
                          />
                          {
                            positionRelationDepartmentsState ?
                              <div>
                                <TextField placeholder="Pozisyon Arayın..." size="small" fullWidth onChange={handleSearch} />
                                <div style={{ height: 300, width: '100%' }}>
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
                                    initialState={{
                                      pagination: {
                                        paginationModel: {
                                          pageSize: 10,
                                        },
                                      },
                                    }}
                                    pageSizeOptions={[10, 20, 30]}
                                  />
                                </div>
                              </div>
                              : null
                          }


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