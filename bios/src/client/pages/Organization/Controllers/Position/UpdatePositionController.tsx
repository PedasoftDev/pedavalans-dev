import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate, useParams } from "@tuval/forms";
import AccountRelation from "../../../../../server/hooks/accountRelation/main";
import OrganizationStructurePosition from "../../../../../server/hooks/organizationStructrePosition/main";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import { Views } from "../../../../components/Views";
import React, { useEffect, useState } from "react";
import { Form } from "../../Views/Views";
import { Autocomplete, FormControlLabel, Switch, TextField } from "@mui/material";
import { Resources } from "../../../../assets/Resources";
import { ToastError, ToastSuccess } from "../../../../components/Toast";
import { IOrganizationStructure } from "../../../../interfaces/IOrganizationStructure";
import AppInfo from "../../../../../AppInfo";
import removeDollarProperties from "../../../../assets/Functions/removeDollarProperties";
import Swal from "sweetalert2";
import Collections from "../../../../../server/core/Collections";
import OrganizationStructureWorkPlace from "../../../../../server/hooks/organizationStructureWorkPlace/main";
import RelatedPositionsWorkPlaces from "../../../../../server/hooks/relatedPositionsWorkPlaces/Main";

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
    const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);
    const { relatedPositionsWorkPlacesList, isLoading: isLoadigRelPosWorkPlacesList } = RelatedPositionsWorkPlaces.GetList();
    const { updateRelatedPositonsWorkPlace } = RelatedPositionsWorkPlaces.Update();
    const { createRelatedPositionsWorkPlaces } = RelatedPositionsWorkPlaces.Create();

    return (
      isLoading || isLoadingResult || isLoadingWorkPlace || isLoadigRelPosWorkPlacesList || isLoadingPositions || isLoadingPosition ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {

          const [formPosition, setFormPosition] = useState(resetFormPosition)
          const [isActive, setIsActive] = useState(true)

          const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);
          const [formWorkPlace, setFormWorkPlace] = useState([]);
          const [relatedPositions, setRelatedPositions] = useState<any[]>([]);

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
              if (workPlaceDefination) {
                // Ensure that we only deal with workplaces related to the current trainer
                const currentRelatedWorkplaces = relatedPositionsWorkPlacesList.filter(
                  (relatedWorkplace) => relatedWorkplace.related_positon_id === formPosition.id
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
                  updateRelatedPositonsWorkPlace({
                    databaseId: AppInfo.Database,
                    collectionId: Collections.Related_Position_Workplaces,
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
                  createRelatedPositionsWorkPlaces({
                    documentId: nanoId,
                    data: {
                      id: nanoId,
                      related_positon_id: id,
                      related_position_record_id: formPosition.record_id,
                      workplace_id: selectedWorkplace.id,
                      workplace_record_id: selectedWorkplace.record_id,
                      is_active: true,
                      is_deleted: false
                    },
                  });
                });
              }
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
            const fetchData = async () => {
              if (position) {
                setFormPosition(position)
                setIsActive(position.is_active)
              }
              const workPlaceDefinationRes = await
                Services.Databases.listDocuments(
                  AppInfo.Name,
                  AppInfo.Database,
                  Collections.Parameter,
                  [
                    Query.equal("name", "work_place_definition"),
                    Query.limit(10000),
                  ]
                )
              setWorkPlaceDefination(workPlaceDefinationRes.documents[0]?.is_active)
              const relatedPositionsResponse = await Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.Related_Position_Workplaces,
                [
                  Query.equal('related_positon_id', id),
                  Query.limit(10000),
                  Query.equal('is_deleted', false),
                  Query.equal('is_active', true)
                ]
              )
              setRelatedPositions(relatedPositionsResponse.documents)
              if (workPlaces.length > 0 && relatedPositionsResponse.documents.length > 0) {
                const initialWorkplaces = workPlaces.filter((workPlace) =>
                  relatedPositionsResponse.documents.some((department) =>
                    department.workplace_id === workPlace.id && department.is_active
                  )
                );
                console.log('Filtered workplaces:', initialWorkplaces);
                setFormWorkPlace(initialWorkplaces);
              }
            }
            fetchData();
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