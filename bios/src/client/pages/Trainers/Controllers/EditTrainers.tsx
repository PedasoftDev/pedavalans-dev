import { ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cTop, nanoid, useNavigate, useParams } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Autocomplete, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { Query, Services, useDeleteCache, useGetMe, useListAccounts } from "@realmocean/sdk";
import { Toast } from "../../../components/Toast";
import ITrainers from "../../../interfaces/ITrainers";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import Form from "../Views/Form";
import Education from "../../../../server/hooks/education/main";
import Trainers from "../../../../server/hooks/trainers/main";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import Swal from "sweetalert2";
import ITrainerEducations from "../../../interfaces/ITrainerEducations";
import TrainerEducations from "../../../../server/hooks/trainerEducations/main";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, GridToolbar, trTR } from "@mui/x-data-grid";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import OrganizationStructureWorkPlace from "../../../../server/hooks/organizationStructureWorkPlace/main";
import RelatedWorkPlacesToTrainer from "../../../../server/hooks/relatedWorkplacesToTrainer/Main";

const positionBased = localStorage.getItem("position_based_polyvalence_management") === "true" ? true : false;


const formReset: ITrainers.IBase = {
  id: "",
  trainer_id: "",
  trainer_name: "",
  is_active: true,
  is_deleted: false
}
const trainerEducationsFormReset: ITrainerEducations.IBase = {
  id: "",
  trainer_id: "",
  trainer_duty_id: "",
  trainer_duty_name: "",
  is_active: true,
  is_deleted: false
}


export class EditTrainers extends UIController {

  public LoadView(): UIView {
    const { id } = useParams()
    const navigate = useNavigate();
    const { deleteCache } = useDeleteCache("console")

    const [form, setForm] = useState<ITrainers.IBase>(formReset);
    const [trainerEducationsForm, setTrainerEducationsForm] = useState<string[]>([])

    const [isActive, setIsActive] = useState<boolean>(true);

    const { isLoadingTrainerEducationsList, trainerEducationsList } = TrainerEducations.GetList()
    const { updateTrainers } = Trainers.Update()
    const { createTrainerEducations } = TrainerEducations.Create()
    const { updateTrainerEducations } = TrainerEducations.Update()


    const { me, isLoading } = useGetMe("console");
    const { accounts, isLoading: isLoadingAccounts } = useListAccounts();

    const { educationList, isLoading: isLoadingEducation } = Education.GetList()
    const { trainerEducationsRelationList, isLoading: isLoadingTrainerEducationRelation } = TrainerEducations.ListByTrainer(id)

    //workplace
    const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);
    const [formWorkPlace, setFormWorkPlace] = useState([]);
    const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);
    const { createRelatedWorkplacesToTrainer } = RelatedWorkPlacesToTrainer.Create();
    const { relatedWorkPlacesToTrainer, isLoading: isLoadingRelatedWorkPlacesToTrainer } = RelatedWorkPlacesToTrainer.GetList()
    const { updateRelatedWorkplacesToTrainer } = RelatedWorkPlacesToTrainer.Update()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.target.name as string]: e.target.value
      })
    }

    const onSubmit = (e) => {
      e.preventDefault();
      Toast.fire({
        icon: "info",
        title: "Eğitici düzenleniyor...",
        timer: 5000,
      })

      updateTrainers({
        databaseId: AppInfo.Database,
        collectionId: Collections.Trainers,
        documentId: id,
        data: removeDollarProperties(form)
      }, () => {
        if (workPlaceDefination) {
          // Ensure that we only deal with workplaces related to the current trainer
          const currentRelatedWorkplaces = relatedWorkPlacesToTrainer.filter(
            (relatedWorkplace) => relatedWorkplace.trainer_id === form.id
          );

          // Identify removed workplaces (those that are in the database but not in the selected list)
          const removedWorkplaces = currentRelatedWorkplaces.filter(
            (relatedWorkplace) =>
              !formWorkPlace.some(
                (selectedWorkplace) => selectedWorkplace.id === relatedWorkplace.work_place_id
              )
          );

          // Identify new workplaces (those that are selected but not in the database)
          const newWorkplaces = formWorkPlace.filter(
            (selectedWorkplace) =>
              !currentRelatedWorkplaces.some(
                (relatedWorkplace) => relatedWorkplace.work_place_id === selectedWorkplace.id
              )
          );

          // Update removed workplaces to be inactive and deleted
          removedWorkplaces.forEach((workplace) => {
            updateRelatedWorkplacesToTrainer({
              databaseId: AppInfo.Database,
              collectionId: Collections.Related_Workplaces_To_Trainer,
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
            createRelatedWorkplacesToTrainer({
              documentId: nanoId,
              data: {
                id: nanoId,
                trainer_id: form.id,
                work_place_id: selectedWorkplace.id,
                work_place_name: selectedWorkplace.name,
                tenant_id: me?.prefs?.organization,
                is_active: true,
                is_deleted: false,
              },
            });
          });
        }
        trainerEducationsRelationList.forEach((relation) => {
          updateTrainerEducations({
            databaseId: AppInfo.Database,
            collectionId: Collections.TrainerEducations,
            documentId: relation.$id,
            data: {
              is_deleted: true,
              is_active: false
            }
          })
        })
        trainerEducationsForm.forEach((competency_id, i) => {
          const nanoId = nanoid();
          createTrainerEducations({
            documentId: nanoId,
            data: {
              id: nanoId,
              trainer_id: form.id,
              trainer_duty_id: competency_id,
              trainer_duty_name: educationList.find((item) => item.$id === competency_id).name,
              is_active: true,
              is_deleted: false

            }
          })
        })

        Toast.fire({
          icon: "success",
          title: "Eğitim başarıyla güncellendi!"
        });
        deleteCache();
        navigate("/app/trainer/list");
      })


    }

    const onDelete = () => {
      Swal.fire({
        title: "Eğitici Silme",
        text: "Eğiticiyi silmek istediğinize emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sil",
        cancelButtonText: "İptal",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6"
      }).then((result) => {
        if (result.isConfirmed) {
          Toast.fire({
            icon: "info",
            title: "Eğitici siliniyor...",
            timer: 5000,
          })
          updateTrainers({
            databaseId: AppInfo.Database,
            collectionId: Collections.Trainers,
            documentId: id,
            data: {
              ...form,
              is_deleted: true
            }
          }, () => {
            deleteCache()
            Toast.fire({
              icon: "success",
              title: "Eğitici başarıyla silindi",
              timer: 5000,
            })
            navigate("/app/trainer/list")
          })
        }
      })
    }

    const onCancel = () => {
      navigate("/app/trainer/list");
    }

    const columns: GridColDef[] = [
      {
        field: "name",
        headerName: "Eğitim Adı",
        flex: 1
      }
    ];


    return (
      VStack({ alignment: cTop })(
        isLoading || isLoadingAccounts || isLoadingWorkPlace || isLoadingRelatedWorkPlacesToTrainer || isLoadingTrainerEducationsList || isLoadingEducation || isLoadingTrainerEducationRelation ? VStack(Spinner()) :
          UIViewBuilder(() => {
            useEffect(() => {
              Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.Trainers,
                [
                  Query.equal("id", id),
                  Query.equal("is_deleted", false)
                ]
              ).then((res) => {
                const data = res.documents[0];
                setForm({
                  id: data.id,
                  trainer_id: data.trainer_id,
                  trainer_name: data.trainer_name,
                  is_active: data.is_active,
                  is_deleted: data.is_deleted
                })
                setIsActive(data.is_active)
              })
              setTrainerEducationsForm(trainerEducationsRelationList.map((relation) => relation.trainer_duty_id))
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
              Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.Related_Workplaces_To_Trainer,
                [
                  Query.equal("trainer_id", id),
                  Query.equal("is_deleted", false),
                  Query.equal("is_active", true),
                  Query.limit(10000)
                ]
              ).then((res) => {
                const relatedWorkplaces = workPlaces.filter((item) =>
                  res.documents.some((relatedWorkplace) => relatedWorkplace.work_place_id === item.id))
                setFormWorkPlace(relatedWorkplaces)
              })

            }, [])
            return (
              ReactView(
                <Form
                  title="Eğiticiyi Düzenleyin"
                  form={
                    <form
                      onSubmit={onSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        width: "60%"
                      }}>
                      <Autocomplete
                        size="small"
                        options={accounts}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Eğitici Adı" variant="outlined" />}
                        onChange={(e, value) => {
                          setForm({
                            ...form,
                            trainer_name: value.name || "",
                            trainer_id: value.$id || ""
                          })
                        }}
                        value={accounts.find((item) => item.$id === form.trainer_id) || null}
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
                      <StyledDataGrid
                        rows={
                          educationList.filter((item) => item.is_active === true && item.is_deleted === false)
                        }
                        columns={columns}
                        getRowId={(row) => row.$id}
                        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                        isCellEditable={() => false}
                        disableRowSelectionOnClick
                        checkboxSelection
                        onRowSelectionModelChange={(newRowSelectionModel: any) => {
                          setTrainerEducationsForm(newRowSelectionModel);
                        }}
                        rowSelectionModel={trainerEducationsForm}
                        rowHeight={30}
                        columnHeaderHeight={30}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                          toolbar: {
                            showQuickFilter: true,
                          },
                        }}
                      />

                      <FormControlLabel
                        sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
                        onChange={(e: any) => setForm({ ...form, is_active: e.target.checked })}
                        control={<Switch color="primary" checked={form.is_active} />}
                        label="Aktif mi?"
                        labelPlacement="start"
                      />


                      <div style={{
                        display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
                      }}>
                        <Button type="submit" variant="contained" color="primary" size="small">Kaydet</Button>
                        {
                          !isActive &&
                          <Button variant="contained" color="error" size="small" onClick={onDelete}>Sil</Button>

                        }
                        <Button variant="contained" color="info" size="small" onClick={onCancel}>İptal</Button>
                      </div>
                    </form>

                  }
                />
              ))
          })
      ).padding("30px 20px")
    )
  }
}