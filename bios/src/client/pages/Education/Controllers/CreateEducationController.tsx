import { ReactView, Spinner, UIFormController, UIView, UIViewBuilder, VStack, cTop, useNavigate } from "@tuval/forms";
import React, { useState } from "react";
import {
    Button,
    TextField,
    Select,
    MenuItem,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Typography,
} from "@mui/material";
import { useGetMe, useDeleteCache } from "@realmocean/sdk";
import Competency from "../../../../server/hooks/competency/main";
import { Resources } from "../../../assets/Resources";
import Form from "../../Competency/Views/Form";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import IEducation from "../../../interfaces/IEducation";
import Education from "../../../../server/hooks/education/main";
import EducationCompetencyRelation from "../../../../server/hooks/educationCompetencyRelation/main";
import { Toast } from "../../../components/Toast";
import AppInfo from "../../../../AppInfo";

const resetForm: IEducation.ICreate = {
    code: "",
    name: "",
    relatedCompetencies: [],
    type: "",
    tenant_id: "",
};

export class CreateEducationController extends UIFormController {

    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading } = useGetMe("console")
        const { deleteCache } = useDeleteCache(AppInfo.Name)

        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization)
        const { createEducation } = Education.Create()

        const { createEducationCompetencyRelation } = EducationCompetencyRelation.Create()
        const { educationList, isLoading: isLoadingEducation } = Education.GetList()

        return (
            VStack({ alignment: cTop })(
                isLoading || isLoadingCompetencyList || isLoadingEducation ? VStack(Spinner()) :
                    UIViewBuilder(() => {

                        const [form, setForm] = useState<IEducation.ICreate>(resetForm);

                        const navigateToList = () => navigate("/app/education/list");

                        const handleChangeText = (e: any) => {
                            setForm({ ...form, [e.target.name]: e.target.value });
                        };

                        const handleChangeSelect = (event: SelectChangeEvent<any>) => {
                            setForm({ ...form, [event.target.name]: event.target.value });
                        };

                        const handleSubmit = (e: React.FormEvent) => {
                            e.preventDefault();
                            if (form.relatedCompetencies.length === 0) return;

                            if (educationList.some((education) => education.code === form.code)) {
                                Toast.fire({
                                    icon: "error",
                                    title: "Bu eğitim katalog kodu zaten mevcut!"
                                });
                                return;
                            }

                            createEducation({
                                data: {
                                    code: form.code,
                                    name: form.name,
                                    type: form.type,
                                    tenant_id: me?.prefs?.organization,
                                }
                            }, (res) => {
                                form.relatedCompetencies.forEach((competency_id, i) => {
                                    createEducationCompetencyRelation({
                                        data: {
                                            education_id: res.$id,
                                            competency_id: competency_id,
                                            competency_name: competencyList.find((c) => c.$id === competency_id)?.competency_name,
                                            tenant_id: me?.prefs?.organization,
                                        }
                                    }, () => {
                                        if (i === form.relatedCompetencies.length - 1) {
                                            Toast.fire({
                                                icon: "success",
                                                title: "Eğitim başarıyla eklendi!"
                                            });
                                            deleteCache();
                                            navigateToList();
                                        }
                                    })
                                })
                            })
                        };

                        const columns: GridColDef[] = [
                            {
                                field: "competency_name",
                                headerName: "Yetkinlik Adı",
                                flex: 1
                            }
                        ];

                        return (
                            ReactView(
                                <Form
                                    title="Yeni Eğitim Ekle"
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
                                                value={form.code}
                                                name="code"
                                                inputProps={{ maxLength: 50 }}
                                                label="Eğitim Katalog Kodu"
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                onChange={handleChangeText}
                                                value={form.name}
                                                name="name"
                                                multiline={true}
                                                rows={4}
                                                label="Eğitim Tanımı"
                                                required
                                            />
                                            <div style={{
                                                height: "280px",
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "5px",
                                            }}>
                                                <Typography variant="button" sx={{ marginLeft: "10px" }}>İlişkili Yetkinlikler</Typography>
                                                <StyledDataGrid
                                                    rows={competencyList}
                                                    columns={columns}
                                                    getRowId={(row) => row.$id}
                                                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                    isCellEditable={() => false}
                                                    disableRowSelectionOnClick
                                                    checkboxSelection
                                                    onRowSelectionModelChange={(newRowSelectionModel: any) => {
                                                        setForm({ ...form, relatedCompetencies: newRowSelectionModel });
                                                    }}
                                                    rowHeight={30}
                                                    columnHeaderHeight={30}
                                                />
                                            </div>
                                            <FormControl fullWidth size="small" required>
                                                <InputLabel>Eğitim Türü</InputLabel>
                                                <Select
                                                    name="type"
                                                    value={form.type}
                                                    label="Eğitim Türü"
                                                    onChange={handleChangeSelect}
                                                    size="small"
                                                    required
                                                >
                                                    {Resources.EducationTypes.map((education_type) => (
                                                        <MenuItem
                                                            value={education_type.id}
                                                            key={education_type.id}
                                                        >
                                                            {education_type.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
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