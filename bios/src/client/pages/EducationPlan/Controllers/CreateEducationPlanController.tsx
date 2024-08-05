import { ReactView, Spinner, UIFormController, UIView, UIViewBuilder, VStack, cTop, nanoid, useNavigate } from "@tuval/forms";
import React, { useState } from "react";
import {
    Button,
    TextField,
    SelectChangeEvent,
} from "@mui/material";
import { useGetMe, useDeleteCache } from "@realmocean/sdk";
import Form from "../../Competency/Views/Form";
import { GridColDef, trTR } from "@mui/x-data-grid";
import Education from "../../../../server/hooks/education/main";
import { Toast } from "../../../components/Toast";
import AppInfo from "../../../../AppInfo";
import IEducationPlan from "../../../interfaces/IEducationPlan";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import EducationPlan from "../../../../server/hooks/educationPlan/main";

const resetForm: IEducationPlan.ICreate = {
    education_plan_id: "",
    education_plan_name: "",
    plan_start_date: "",
    plan_end_date: "",
    tenant_id: "",
};

export class CreateEducationPlanController extends UIFormController {

    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading } = useGetMe("console")
        const { deleteCache } = useDeleteCache(AppInfo.Name)

        const { createEducationPlan, isLoading: isLoadingEducationPlan } = EducationPlan.Create()

        return (
            VStack({ alignment: cTop })(
                isLoading || isLoadingEducationPlan ? VStack(Spinner()) :
                    UIViewBuilder(() => {

                        const [form, setForm] = useState<IEducationPlan.ICreate>(resetForm);

                        const navigateToList = () => navigate("/app/education-plan/plans");

                        const handleChangeText = (e: any) => {
                            setForm({ ...form, [e.target.name]: e.target.value });
                        };

                        const handleSubmit = (e: React.FormEvent) => {
                            e.preventDefault();

                            const education_plan_id: string = nanoid()
                            createEducationPlan({
                                documentId: education_plan_id,
                                data: {
                                    ...form,
                                    education_plan_id: education_plan_id,
                                    tenant_id: me?.prefs?.organization,
                                }
                            }, () => {
                                Toast.fire({
                                    icon: "success",
                                    title: "Eğitim Planı başarıyla eklendi!"
                                });
                                deleteCache();
                                navigateToList();
                            })
                        };

                        return (
                            ReactView(
                                <Form
                                    title="Yeni Eğitim Planı Oluşturma"
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
                                            <TextField
                                                size="small"
                                                fullWidth
                                                onChange={handleChangeText}
                                                value={form.education_plan_name}
                                                name="education_plan_name"
                                                inputProps={{ maxLength: 50 }}
                                                label="Eğitim Planı Adı"
                                                required
                                            />
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker label="Plan Başlangıç Tarihi"
                                                    format="DD/MM/YYYY"
                                                    value={dayjs(form.plan_start_date)}
                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    onChange={(e: any) => {
                                                        setForm({ ...form, plan_start_date: e.$d });
                                                    }} />
                                            </LocalizationProvider>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker label="Plan Bitiş Tarihi"
                                                    format="DD/MM/YYYY"
                                                    value={dayjs(form.plan_end_date)}
                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    onChange={(e: any) => {
                                                        setForm({ ...form, plan_end_date: e.$d });
                                                    }} />
                                            </LocalizationProvider>


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