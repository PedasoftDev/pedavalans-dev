import { ReactView, Spinner, UIFormController, UIView, UIViewBuilder, VStack, cTop, useNavigate } from "@tuval/forms";
import React, { useState } from "react";
import {
    Button,
    TextField,
    FormControl,
    Autocomplete,
} from "@mui/material";
import { EmailBroker, useGetMe, useListAccounts } from "@realmocean/sdk";
import Form from "../../Competency/Views/Form";
import Education from "../../../../server/hooks/education/main";
import IAssignedEducation from "../../../interfaces/IAssignedEducation";
import OrganizationStructureEmployee from "../../../../server/hooks/organizationStructureEmployee/main";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AssignEducation from "../../../../server/hooks/assignEducation/main";
import assignedEducationTemplate from "../../../components/email/AssignedEducationTemplate";
import dayjs from "dayjs";

const resetForm: IAssignedEducation.ICreate = {
    education_code: "",
    employee_id: "",
    educator_id: "",
    start_date: "",
    end_date: "",
    tenant_id: "",
    education_id: "",
    education_name: "",
    hour: "0:00",
    educator_name: "",
    employee_name: "",
    location: "",
    status: "open",
};

export class AssignEducationController extends UIFormController {

    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading } = useGetMe("console")

        const { educationList, isLoading: isLoadingEducation } = Education.GetList();
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts();
        const { createAssignedEducation } = AssignEducation.Create();

        return (
            VStack({ alignment: cTop })(
                isLoading || isLoadingEducation || isLoadingEmployees || isLoadingAccounts ? VStack(Spinner()) :
                    UIViewBuilder(() => {

                        const [form, setForm] = useState<IAssignedEducation.ICreate>(resetForm);
                        const [selectedEmployees, setSelectedEmployees] = useState<typeof employees>([]);

                        const navigateToList = () => navigate("/app/education/assigned");

                        const handleSubmit = (e: React.FormEvent) => {
                            e.preventDefault();
                            selectedEmployees.forEach((employee, _i) => {
                                const createForm: IAssignedEducation.ICreate = {
                                    education_code: form.education_code,
                                    employee_id: employee.$id,
                                    education_id: form.education_id,
                                    education_name: form.education_name,
                                    educator_id: form.educator_id,
                                    educator_name: form.educator_name,
                                    hour: form.hour,
                                    employee_name: `${employee.first_name} ${employee.last_name}`,
                                    start_date: form.start_date,
                                    location: form.location,
                                    end_date: form.end_date,
                                    status: form.status,
                                    tenant_id: me?.prefs?.organization
                                }
                                createAssignedEducation({
                                    data: createForm
                                }, async () => {
                                    if (_i === selectedEmployees.length - 1) {
                                        const account = accounts.find(x => x.$id === form.educator_id);
                                        const emailTemplate = assignedEducationTemplate(selectedEmployees.map(x => `${x.first_name} ${x.last_name}`));
                                        const key = await EmailBroker.Default.createKey({
                                            smtpServer: "smtp-mail.outlook.com",
                                            smtpPort: "587",
                                            password: "V%443989818492ug",
                                            username: "notification@pedabilisim.com",
                                            tls: false
                                        })
                                        await EmailBroker.Default.setKey(key)
                                            .sendEmail("notification@pedabilisim.com", account?.email, "Eğitim Ataması", emailTemplate, {
                                                educatorName: form.educator_name,
                                                code: form.education_code,
                                                name: form.education_name,
                                                hour: form.hour,
                                                startDate: new Date(form.start_date).toLocaleDateString("tr-TR"),
                                                endDate: new Date(form.end_date).toLocaleDateString("tr-TR")
                                            })
                                        navigateToList();
                                    }
                                })
                            })
                        };

                        return (
                            ReactView(
                                <Form
                                    title="Yeni Eğitim Atayın"
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
                                            <FormControl fullWidth size="small" required>
                                                <Autocomplete
                                                    options={educationList}
                                                    getOptionLabel={(education) => education.name}
                                                    value={educationList.find((education) => education.$id === form.education_id) || null}
                                                    onChange={(event, newValue) => {
                                                        if (newValue) {
                                                            setForm({
                                                                ...form,
                                                                education_id: newValue.$id,
                                                                education_name: newValue.name,
                                                                education_code: newValue.code
                                                            });
                                                        }
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Eğitim"
                                                            size="small"
                                                            required
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                            <Autocomplete
                                                multiple
                                                disableCloseOnSelect
                                                options={employees}
                                                getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                                                filterSelectedOptions
                                                size="small"
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Eğitim Alacak Personel"
                                                        size="small"
                                                    />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setSelectedEmployees(newValue);
                                                }}
                                            />
                                            <FormControl fullWidth size="small" required>
                                                <Autocomplete
                                                    options={accounts}
                                                    getOptionLabel={(account) => account.name}
                                                    value={accounts.find((account) => account.$id === form.educator_id) || null}
                                                    onChange={(event, newValue) => {
                                                        if (newValue) {
                                                            setForm({
                                                                ...form,
                                                                educator_id: newValue.$id,
                                                                educator_name: newValue.name
                                                            });
                                                        }
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Eğitimci"
                                                            size="small"
                                                            required
                                                        />
                                                    )}
                                                />
                                            </FormControl>
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
                        )
                    })

            ).padding("30px 20px")
        )
    }
}