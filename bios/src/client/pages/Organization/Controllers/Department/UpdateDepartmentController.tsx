import React, { useState, Fragment, useEffect } from 'react';
import { Autocomplete, FormControlLabel, Switch, TextField } from '@mui/material';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main';
import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate, useParams } from '@tuval/forms';
import { Query, Services, useDeleteCache, useGetMe } from '@realmocean/sdk';
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
import PolyvalenceUnit from '../../../../../server/hooks/polyvalenceUnit/main';
import OrganizationStructureWorkPlace from '../../../../../server/hooks/organizationStructureWorkPlace/main';
import RelatedDepartmentsWorkPlaces from '../../../../../server/hooks/relatedDepartmentsWorkPlaces/Main';

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
    const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetList(me?.prefs?.organization);
    const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);
    const { isLoading: isLoadingRelDepWorkPlacesList, relatedDepartmentsWorkPlacesList } = RelatedDepartmentsWorkPlaces.GetList();
    const { createRelatedDepartmentsWorkPlaces } = RelatedDepartmentsWorkPlaces.Create();
    const { updateRelatedDepartmentsWorkPlace } = RelatedDepartmentsWorkPlaces.Update();

    const { deleteCache } = useDeleteCache(AppInfo.Name);

    const navigate = useNavigate();
    return (
      isLoading || isLoadingPositions || isLoadingRelDepWorkPlacesList || isLoadingWorkPlace || isLoadingPolyvalenceUnit || isLoadingDepartments || isLoadingPositionRelationDepartments || isLoadingDepartment || isLoadingResult ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {

          const [formDepartment, setFormDepartment] = useState(formDepartmentState);
          const [positionRelationDepartmentsState, setPositionRelationDepartmentsState] = useState<boolean>(false);
          const [isActive, setIsActive] = useState(document.is_active);
          const [filterKey, setFilterKey] = useState("");
          const [formWorkPlace, setFormWorkPlace] = useState([]);
          const [relatedDepartments, setRelatedDepartments] = useState<any[]>([]);
          const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);

          const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterKey(e.target.value);
          }

          const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // Mevcut departmanın unique olup olmadığını kontrol et
            if (departments.some((department) => department.record_id == formDepartment.record_id && department.id != formDepartment.id)) {
              Toast.fire({
                icon: "error",
                title: "Departman eklenirken bir hata oluştu!",
                text: "Departman kodu zaten kullanılmaktadır."
              });
              return;
            }

            let isNameChanged = document.name != formDepartment.name;

            updateDocument({
              databaseId: AppInfo.Database,
              collectionId: "organization_department",
              documentId: id,
              data: removeDollarProperties(formDepartment)
            }, () => {
              if (workPlaceDefination) {
                // Ensure that we only deal with workplaces related to the current trainer
                const currentRelatedWorkplaces = relatedDepartmentsWorkPlacesList.filter(
                  (relatedWorkplace) => relatedWorkplace.related_department_id === formDepartment.id
                );

                // Identify removed workplaces (those that are in the database but not in the selected list)
                const removedWorkplaces = currentRelatedWorkplaces.filter(
                  (relatedWorkplace) =>
                    !formWorkPlace.some(
                      (selectedWorkplace) => selectedWorkplace.id === relatedWorkplace.workplace_id
                    )
                );

                // Identify new workplaces (those that are selected but not in the database)
                const newWorkplaces = formWorkPlace.filter(
                  (selectedWorkplace) =>
                    !currentRelatedWorkplaces.some(
                      (relatedWorkplace) => relatedWorkplace.workplace_id === selectedWorkplace.id
                    )
                );

                // Update removed workplaces to be inactive and deleted
                removedWorkplaces.forEach((workplace) => {
                  updateRelatedDepartmentsWorkPlace({
                    databaseId: AppInfo.Database,
                    collectionId: Collections.Related_Departments_Workplaces,
                    documentId: workplace.$id,
                    data: {
                      is_active: false,
                      is_deleted: true,
                    },
                  });
                });

                // Add new workplaces
                newWorkplaces.forEach((selectedWorkplace) => {
                  const nanoId = nanoid();
                  createRelatedDepartmentsWorkPlaces({
                    documentId: nanoId,
                    data: {
                      id: nanoId,
                      related_department_record_id: formDepartment.record_id,
                      related_department_id: formDepartment.id,
                      workplace_id: selectedWorkplace.id,
                      workplace_record_id: selectedWorkplace.record_id,
                      is_active: true,
                      is_deleted: false
                    },
                  });
                });
              }
              if (isNameChanged) {
                PedavalansServiceBroker.Default.updateCompetencyDepartmentNames(formDepartment.id, formDepartment.name).then(() => {
                  Toast.fire({
                    icon: "success",
                    title: "Departman başarıyla güncellendi!",
                  });
                  deleteCache();
                  onReset();
                }).then(() => {
                  Services.Databases.updateDocument(
                    AppInfo.Name,
                    AppInfo.Database,
                    Collections.PolyvalenceUnitTable,
                    polyvalenceUnitList.find((item) => item.polyvalence_department_id === formDepartment.id).$id,
                    {
                      polyvalence_department_name: formDepartment.name
                    }
                  );
                });
              } else {
                Toast.fire({
                  icon: "success",
                  title: "Departman başarıyla güncellendi!",
                });
                deleteCache();
                onReset();
              }
            });
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
            const fetchData = async () => {
              if (document) {
                setFormDepartment(removeDollarProperties(document));
                setIsActive(document.is_active);
              }
              const positionRelationDepartmentsResponse = await Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.Parameter,
                [
                  Query.equal("name", "position_relation_department"),
                  Query.limit(10000),
                ]
              );
              setPositionRelationDepartmentsState(positionRelationDepartmentsResponse.documents[0]?.is_active);

              const workPlaceDefinationResponse = await Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.Parameter,
                [
                  Query.equal("name", "work_place_definition"),
                  Query.limit(10000),
                ]
              );
              setWorkPlaceDefination(workPlaceDefinationResponse.documents[0]?.is_active);

              const positionsFormResponse = await Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.PositionRelationDepartments,
                [
                  Query.equal("parent_department_id", id),
                  Query.equal("is_active", true),
                  Query.limit(10000)
                ]
              );
              setPositionsForm(positionsFormResponse.documents.map((item) => item.relation_position_id));
              const relatedDepartmentsResponse = await Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.Related_Departments_Workplaces,
                [
                  Query.equal("related_department_id", id),
                  Query.equal("is_active", true),
                  Query.limit(10000)
                ]
              );
              setRelatedDepartments(relatedDepartmentsResponse.documents);
              if (workPlaces.length > 0 && relatedDepartmentsResponse.documents.length > 0) {
                const initialWorkplaces = workPlaces.filter((workPlace) =>
                  relatedDepartmentsResponse.documents.some((department) =>
                    department.workplace_id === workPlace.id && department.is_active
                  )
                );
                console.log('Filtered workplaces:', initialWorkplaces);
                setFormWorkPlace(initialWorkplaces);
              }
            };
            fetchData();
          }, []);


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
                          {
                            workPlaceDefination ? (<Autocomplete
                              size='small'
                              multiple
                              onChange={(event, newValue) => {
                                setFormWorkPlace(newValue);
                              }}
                              options={workPlaces.filter((item) => item.is_active === true)}
                              value={formWorkPlace}
                              getOptionLabel={(option) => option?.record_id + " - " + option?.name}
                              renderInput={(params) => <TextField {...params} label="Bağlı Olduğu İşyeri" />}
                            />)
                              : null
                          }
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
                            options={departments.filter((item) => item.is_active === true).reduce(
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
                                      setPositionsForm(newRowSelectionModel);
                                    }}
                                    rowSelectionModel={positionsForm}
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