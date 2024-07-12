import { ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cTop, nanoid, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useDeleteCache, useGetMe, useListAccounts } from "@realmocean/sdk";
import { Toast } from "../../../components/Toast";
import ITrainers from "../../../interfaces/ITrainers";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import Form from "../Views/Form";
import Education from "../../../../server/hooks/education/main";
import Trainers from "../../../../server/hooks/trainers/main";
import ITrainerEducations from "../../../interfaces/ITrainerEducations";
import TrainerEducations from "../../../../server/hooks/trainerEducations/main";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";

const positionBased = localStorage.getItem("position_based_polyvalence_management") === "true" ? true : false;


const formReset: ITrainers.ICreate = {
  id: "",
  trainer_id: "",
  trainer_name: "",
}
const trainerEducationsFormReset: ITrainerEducations.ICreate = {
  id: "",
  trainer_id: "",
  trainer_duty_id: "",
  trainer_duty_name: "",
}

export class CreateTrainers extends UIController {

  public LoadView(): UIView {

    const navigate = useNavigate();
    const { deleteCache } = useDeleteCache("console")

    const [form, setForm] = useState<ITrainers.ICreate>(formReset);
    const [filterKey, setFilterKey] = useState("");
    const [trainerEducationsForm, setTrainerEducationsForm] = useState<ITrainerEducations.ICreate>(trainerEducationsFormReset);
    const [educations, setEducations] = useState<any[]>([]);


    const { me, isLoading } = useGetMe("console");
    const { accounts, isLoading: isLoadingAccounts } = useListAccounts();
    const { educationList, isLoading: isLoadingEducation } = Education.GetList()

    const { createTrainers } = Trainers.Create();
    const { createTrainerEducations } = TrainerEducations.Create()
    const { trainersList, isLoadingTrainersList } = Trainers.GetList()
    const { accountRelations, isLoadingResult } = AccountRelation.GetList(me?.prefs?.organization)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name as string]: e.target.value })
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterKey(e.target.value);
    }

    const onSubmit = (e) => {
      e.preventDefault();
      Toast.fire({
        icon: "info",
        title: "Eğitici ekleniyor...",
        timer: 5000,
      })

      const trainerId = nanoid();
      createTrainers({
        documentId: trainerId,
        data: {
          ...form,
          id: trainerId,
        }
      }, () => {
        educations.forEach((item) => {
          const trainerEducationId = nanoid();
          const createForm: ITrainerEducations.ICreate = {
            id: trainerEducationId,
            trainer_id: trainerId,
            trainer_duty_id: item.$id,
            trainer_duty_name: item.name
          }
          createTrainerEducations({
            documentId: trainerEducationId,
            data: createForm
          }, () => {
            Toast.fire({
              icon: "success",
              title: "Eğitici eklendi",
              timer: 5000,
            })
            deleteCache()
            navigate("/app/trainer/list")

          })

        })
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
        isLoading || isLoadingAccounts || isLoadingEducation || isLoadingTrainersList || isLoadingResult ? VStack(Spinner()) :
          UIViewBuilder(() => {
            return (
              ReactView(
                <Form
                  title="Yeni Eğitici Ekleyin"
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
                        options={
                          accounts.filter((item) =>
                            !trainersList.find((trainer) => trainer.trainer_id === item.$id)
                          ).filter((item) => accountRelations.filter((item) => item.is_active === true).find((relation) => relation.account_id === item.$id))
                        }
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
                      <TextField placeholder="Eğitim Arayın..." size="small" fullWidth onChange={handleSearch} />
                      <StyledDataGrid
                        rows={
                          educationList.filter((item) => item.name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)
                        }
                        columns={columns}
                        getRowId={(row) => row.$id}
                        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                        isCellEditable={() => false}
                        disableRowSelectionOnClick
                        checkboxSelection
                        onRowSelectionModelChange={(newRowSelectionModel: any) => {
                          setEducations(newRowSelectionModel.map((item) => educationList.find((education) => education.$id === item)))
                        }}
                        rowHeight={30}
                        columnHeaderHeight={30}
                      />

                      <div style={{
                        display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
                      }}>
                        <Button type="submit" variant="contained" color="primary" size="small">Kaydet</Button>
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