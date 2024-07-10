import { ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cTop, useEffect, useNavigate, useParams, useState } from "@tuval/forms";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { useGetMe, useListAccounts } from "@realmocean/sdk";
import AssignEducation from "../../../../server/hooks/assignEducation/main";
import Education from "../../../../server/hooks/education/main";
import OrganizationStructureEmployee from "../../../../server/hooks/organizationStructureEmployee/main";
import IAssignedEducation from "../../../interfaces/IAssignedEducation";
import Form from "../../Competency/Views/Form";
import React from "react";
import { Autocomplete, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import IEducation from "../../../interfaces/IEducation";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import IAssignedEducationResult from "../../../interfaces/IAssignedEducationResult";
import AssignEducationResult from "../../../../server/hooks/assignEducationResult/main";
import Swal from "sweetalert2";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import { Toast } from "../../../components/Toast";
const resetForm: IAssignedEducation.IBase = {
  education_code: "",
  employee_id: "",
  educator_id: "",
  start_date: "",
  end_date: "",
  is_active: true,
  is_deleted: false,
  education_id: "",
  education_name: "",
  hour: "0:00",
  education_plan_id: "",
  education_plan_name: "",
  location: "",
  educator_name: "",
  employee_name: "",
  status: "open",
};

const educationResultReset: IAssignedEducationResult.IBase = {
  assigned_education_id: "",
  education_id: "",
  educator_comment: "",
  educator_id: "",
  employee_id: "",
  educator_name: "",
  employee_name: "",
  is_active: true,
  is_deleted: false,
  is_education_completed: false,
  tenant_id: "",
}

export class UpdateAssignedEducationController extends UIController {


  public LoadView(): UIView {
    const { id }: { id: string } = useParams();
    const navigate = useNavigate();

    const { me, isLoading } = useGetMe("console");
    const { educationList, isLoading: isLoadingEducation } = Education.GetList();
    const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
    const { accounts, isLoading: isLoadingAccounts } = useListAccounts();
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
    const { assignedEducation, isLoadingAssignedEducation } = AssignEducation.Get(id)
    const { assignedEducationResult, isLoadingAssignedEducationResult } = AssignEducationResult.Get(id);
    const { createAssignedEducationResult } = AssignEducationResult.Create();
    const { updateAssignedEducation } = AssignEducation.Update();

    return (
      isLoading || isLoadingAccounts || isLoadingEmployees || isLoadingAssignedEducation || isLoadingEducation || isLoadingResult || isLoadingAssignedEducationResult ? VStack(Spinner()) :
        (accountRelations.length === 0 || (accountRelations[0].is_admin === false && accountRelations[0]?.authorization_profile !== "admin")) ?
          UINavigate("/login") :
          UIViewBuilder(() => {
            const [form, setForm] = useState<IAssignedEducation.IBase>(resetForm);
            const [educationResult, setEducationResult] = useState<IAssignedEducationResult.IBase>(educationResultReset);
            const [isActive, setIsActive] = useState(true);

            const navigateToList = () => navigate("/app/education/assigned");

            const handleSubmit = (e: any) => {
              e.preventDefault();
              updateAssignedEducation({
                databaseId: AppInfo.Database,
                collectionId: Collections.AssignedEducation,
                documentId: id,
                data: {
                  ...form
                }
              }, () => {
                if (assignedEducationResult) {
                  updateAssignedEducation({
                    databaseId: AppInfo.Database,
                    collectionId: Collections.AssignedEducationResult,
                    documentId: id,
                    data: {
                      ...educationResult
                    }
                  }, () => {
                    Toast.fire({
                      icon: "success",
                      title: "Eğitim başarıyla güncellendi."
                    })
                    navigateToList();
                  })
                } else if (form.status === "completed") {
                  createAssignedEducationResult({
                    documentId: id,
                    data: {
                      assigned_education_id: id,
                      education_id: form.education_id,
                      educator_comment: educationResult.educator_comment,
                      educator_id: form.educator_id,
                      employee_id: form.employee_id,
                      educator_name: form.educator_name,
                      employee_name: form.employee_name,
                      is_active: true,
                      is_deleted: false,
                      is_education_completed: true,
                      tenant_id: me?.prefs?.organization
                    }
                  }, () => {
                    Toast.fire({
                      icon: "success",
                      title: "Eğitim başarıyla güncellendi."
                    })
                    navigateToList();
                  })
                } else {

                  Toast.fire({
                    icon: "success",
                    title: "Eğitim başarıyla güncellendi."
                  })
                  navigateToList();
                }

              })
            }

            useEffect(() => {
              setForm(removeDollarProperties(assignedEducation));
              setEducationResult(removeDollarProperties(assignedEducationResult));
              setIsActive(assignedEducation.is_active);
            }, [])

            const onDelete = () => {
              Swal.fire({
                title: "Eğitimi Sil",
                text: "Eğitimi silmek istediğinizden emin misiniz?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Evet",
                cancelButtonText: "Hayır",
              }).then((result) => {
                if (result.isConfirmed) {
                  updateAssignedEducation({
                    databaseId: AppInfo.Database,
                    collectionId: Collections.AssignedEducation,
                    documentId: id,
                    data: {
                      ...form,
                      is_deleted: true,
                    }
                  }, () => {
                    Toast.fire({
                      icon: "success",
                      title: "Eğitim başarıyla silindi."
                    })
                    navigateToList();

                  });
                }
              })
            }

            const statusOptions = [
              { value: 'open', label: 'Açık' },
              { value: 'completed', label: 'Tamamlandı' }
            ];

            return (
              VStack({ alignment: cTop })(
                ReactView(
                  <Form
                    title="Atanan Eğitimi Güncelleyin"
                    form={
                      <form
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          width: "60%",
                        }}
                        onSubmit={handleSubmit}
                      >
                        <Autocomplete
                          options={educationList}
                          value={educationList.find((education) => education.$id === form.education_id) || null}
                          onChange={(event, newValue) => {
                            setForm({
                              ...form,
                              education_id: newValue?.$id || "",
                              education_name: newValue?.name || "",
                              education_code: newValue?.code || ""
                            });
                          }}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Eğitim"
                              name="education_id"
                              size="small"
                              required
                            />
                          )}
                        />
                        <TextField
                          name="employee_name"
                          label="Çalışan"
                          value={form.employee_name}
                          size="small"
                          required
                          fullWidth
                        />
                        <Autocomplete
                          options={accounts}
                          value={accounts.find((account) => account.$id === form.educator_id) || null}
                          onChange={(event, newValue) => {
                            setForm({
                              ...form,
                              educator_id: newValue?.$id || "",
                              educator_name: newValue?.name || ""
                            });
                          }}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Eğitimci"
                              name="educator_id"
                              size="small"
                              required
                            />
                          )}
                        />
                        <div style={{
                          display: "flex",
                          gap: "10px",
                        }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Eğitim Başlangıç Tarihi"
                              format="DD/MM/YYYY"
                              slotProps={{ textField: { size: 'small', fullWidth: true } }}
                              value={dayjs(form.start_date)}
                              onChange={(e: any) => {
                                setForm({
                                  ...form,
                                  start_date: e.$d,
                                  end_date: e.$d
                                });
                              }} />
                          </LocalizationProvider>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Eğitim Bitiş Tarihi"
                              format="DD/MM/YYYY"
                              value={dayjs(form.end_date)}
                              slotProps={{ textField: { size: 'small', fullWidth: true } }}
                              onChange={(e: any) => {
                                setForm({ ...form, end_date: e.$d });
                              }} />
                          </LocalizationProvider>
                        </div>
                        <TextField
                          label="Eğitim Yeri"
                          name="location"
                          value={form.location}
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                          size="small"
                          required
                          fullWidth
                        />
                        <div style={{
                          display: "flex",
                          gap: "10px",
                        }}>
                          <TextField
                            label="Saat"
                            name="hour"
                            value={form.hour.split(":")[0]}
                            onChange={(e) => {
                              const minute = form.hour.split(":")[1];
                              let hour = e.target.value;
                              if (hour.startsWith("0")) {
                                hour = hour.substring(1);
                              }
                              setForm({ ...form, hour: `${hour}:${minute}` });
                            }}
                            size="small"
                            required
                            fullWidth
                            type="number"
                            inputProps={{
                              min: 0
                            }}
                          />
                          <TextField
                            label="Dakika"
                            name="minute"
                            fullWidth
                            value={form.hour.split(":")[1]}
                            onChange={(e) => {
                              const hour = form.hour.split(":")[0];
                              if (e.target.value.startsWith("0")) {
                                e.target.value = e.target.value.substring(1);
                              }
                              if (parseInt(e.target.value) > 59) {
                                e.target.value = "59";
                              }
                              setForm({ ...form, hour: `${hour}:${e.target.value}` });
                            }}
                            size="small"
                            required
                            type="number"
                            inputProps={{
                              min: 0,
                              max: 59,
                              step: 15
                            }}
                          />
                        </div>
                        {(assignedEducationResult || form.status === "completed") && <TextField
                          label="Eğitimcinin Yorumu"
                          size="small"
                          fullWidth
                          multiline
                          rows={4}
                          value={educationResult.educator_comment}
                          onChange={(e) => setEducationResult({ ...educationResult, educator_comment: e.target.value })}
                        />}
                        <Autocomplete
                          options={statusOptions}
                          value={statusOptions.find((option) => option.value === form.status) || null}
                          onChange={(event, newValue) => {
                            setForm({ ...form, status: newValue?.value || '' });
                          }}
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Durum"
                              name="status"
                              size="small"
                              required
                            />
                          )}
                        />
                        <FormControlLabel
                          sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
                          onChange={(e: any) => setForm({ ...form, is_active: e.target.checked })}
                          control={<Switch color="primary" checked={form.is_active} />}
                          label="Aktif mi?"
                          labelPlacement="start"
                        />
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "column",
                            marginTop: "10px",
                          }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Kaydet
                          </Button>
                          {
                            !isActive &&
                            <Button variant="contained" color="error" size="small" onClick={onDelete}>Sil</Button>

                          }
                          <Button
                            variant="contained"
                            color="info"
                            size="small"
                            onClick={navigateToList}
                          >
                            İptal
                          </Button>
                        </div>
                      </form>
                    }
                  />
                )
              ).padding("30px 20px")

            )
          })
    )
  }
}