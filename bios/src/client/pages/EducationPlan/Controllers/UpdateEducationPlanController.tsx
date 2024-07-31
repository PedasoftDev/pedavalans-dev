import { ReactView, Spinner, UIFormController, UIView, UIViewBuilder, VStack, cTop, useNavigate, useParams } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import {
    Button,
    FormControlLabel,
    Switch,
    TextField,
} from "@mui/material";
import { useGetMe, useDeleteCache } from "@realmocean/sdk";
import Form from "../../Competency/Views/Form";
import { Toast } from "../../../components/Toast";
import AppInfo from "../../../../AppInfo";
import IEducationPlan from "../../../interfaces/IEducationPlan";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import EducationPlan from "../../../../server/hooks/educationPlan/main";
import Collections from "../../../../server/core/Collections";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import Swal from "sweetalert2";

const resetForm: IEducationPlan.IBase = {
    education_plan_id: "",
    education_plan_name: "",
    plan_start_date: "",
    plan_end_date: "",
    tenant_id: "",
    is_active: true,
    is_deleted: false
};

export class UpdateEducationPlanController extends UIFormController {

    public LoadView(): UIView {

        const navigate = useNavigate();
        const { id } = useParams();

        const { me, isLoading } = useGetMe("console")
        const { deleteCache } = useDeleteCache(AppInfo.Name)

        const { updateEducationPlan, isLoading: isLoadingEducationPlan } = EducationPlan.Update()

        const { educationPlanList, isLoading: isLoadingEducationPlanList } = EducationPlan.Get(id)

        return (
            VStack({ alignment: cTop })(
                isLoading || isLoadingEducationPlan || isLoadingEducationPlanList ? VStack(Spinner()) :
                    UIViewBuilder(() => {

                        const [form, setForm] = useState<IEducationPlan.IBase>(resetForm);
                        const [isActive, setIsActive] = useState<boolean>(true)

                        const navigateToList = () => navigate("/app/education-plan/plans");

                        useEffect(() => {
                            setForm(removeDollarProperties(educationPlanList))

                            setIsActive(educationPlanList.is_active)
                        }, [])

                        const handleChangeText = (e: any) => {
                            setForm({ ...form, [e.target.name]: e.target.value });
                        };

                        const handleSubmit = (e: React.FormEvent) => {
                            e.preventDefault();

                            updateEducationPlan({
                                databaseId: AppInfo.Database,
                                collectionId: Collections.EducationPlan,
                                documentId: id,
                                data: removeDollarProperties(form)
                            }, () => {
                                Toast.fire({
                                    icon: "success",
                                    title: "Eğitim Planı başarıyla güncellendi!"
                                });
                                deleteCache();
                                navigateToList();
                            })
                        };

                        const onDelete = () => {
                            Swal.fire({
                                title: 'Eğitim Planı Silme',
                                text: 'Eğitim Planını silmek istediğinize emin misiniz?',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Sil',
                                cancelButtonText: 'İptal',
                                confirmButtonColor: '#d33',
                                cancelButtonColor: '#3085d6',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Toast.fire({
                                        icon: 'info',
                                        title: 'Eğitim Planı siliniyor...',
                                        timer: 5000,
                                    })
                                    updateEducationPlan(
                                        {
                                            databaseId: AppInfo.Database,
                                            collectionId: Collections.EducationPlan,
                                            documentId: id,
                                            data: {
                                                ...form,
                                                is_deleted: true,
                                            },
                                        },
                                        () => {
                                            Toast.fire({
                                                icon: 'success',
                                                title: 'Eğitim Planı başarıyla silindi.',
                                            })
                                            deleteCache();
                                            navigateToList()

                                        }
                                    )
                                }
                            })
                        }

                        return (
                            ReactView(
                                <Form
                                    title="Eğitim Planını Düzenle"
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
                                            <FormControlLabel
                                                sx={{ width: "100%", alignContent: "end" }}
                                                onChange={(e: any) => setForm({ ...form, is_active: e.target.checked })}
                                                value={form.is_active}
                                                control={<Switch color="primary" checked={form.is_active} />}
                                                label="Aktif mi?"
                                                labelPlacement="start"
                                            />

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    flexDirection: 'column',
                                                    marginTop: '10px',
                                                }}
                                            >
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                >
                                                    Güncelle
                                                </Button>
                                                {!isActive && (
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        size="small"
                                                        onClick={onDelete}
                                                    >
                                                        Sil
                                                    </Button>
                                                )}
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