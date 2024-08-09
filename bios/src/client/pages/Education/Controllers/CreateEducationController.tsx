import { ReactView, Spinner, UIFormController, UIView, UIViewBuilder, VStack, cTop, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import {
    Button,
    TextField,
    Select,
    MenuItem,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Typography,
    Autocomplete,
} from "@mui/material";
import { useGetMe, useDeleteCache, Services, Query } from "@realmocean/sdk";
import Competency from "../../../../server/hooks/competency/main";
import { Resources } from "../../../assets/Resources";
import Form from "../../Competency/Views/Form";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { DataGrid, GridColDef, trTR } from "@mui/x-data-grid";
import IEducation from "../../../interfaces/IEducation";
import Education from "../../../../server/hooks/education/main";
import EducationCompetencyRelation from "../../../../server/hooks/educationCompetencyRelation/main";
import { Toast } from "../../../components/Toast";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";

const resetForm: IEducation.ICreate = {
    code: "",
    name: "",
    relatedCompetencies: [],
    type: "",
    tenant_id: "",
};
const educationToUpdateCompetencyStatusParams = {
    id: 1,
    lower_bound: "",
    upper_bound: "",
    competency_level: "",
}

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

                        const [educationToUpdateCompetencyStatus, setEducationToUpdateCompetencyStatus] = useState<boolean>(false)
                        const [rows, setRows] = useState([])

                        const navigateToList = () => navigate("/app/education/list");

                        const handleChangeText = (e: any) => {
                            setForm({ ...form, [e.target.name]: e.target.value });
                        };

                        const handleSubmit = (e: React.FormEvent) => {
                            e.preventDefault();

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
                                if (form.relatedCompetencies.length === 0) {
                                    Toast.fire({
                                        icon: "success",
                                        title: "Eğitim başarıyla eklendi!"
                                    });
                                    deleteCache();
                                    navigateToList();
                                }
                            })
                        };

                        const columns: GridColDef[] = [
                            {
                                field: "competency_name",
                                headerName: "Yetkinlik Adı",
                                flex: 1
                            }
                        ];
                        const educationToUpdateCompetencyStatusColums: GridColDef[] = [
                            {
                                field: "lower_bound",
                                headerName: "Alt Aralık",
                                flex: 1
                            },
                            {
                                field: "upper_bound",
                                headerName: "Üst Aralık",
                                flex: 1
                            },
                            {
                                field: "competency_level",
                                headerName: "İlişkiki Yetkinlik Seviyesi",
                                flex: 1
                            }
                        ]
                        const [addEducationToUpdateCompetencyStatusParams, setAddEducationToUpdateCompetencyStatusParams] = useState(educationToUpdateCompetencyStatusParams)
                        const handleChangeEducationToUpdateCompetencyStatusParams = (e: React.ChangeEvent<HTMLInputElement>) => {
                            const { name, value } = e.target
                            setAddEducationToUpdateCompetencyStatusParams({ ...addEducationToUpdateCompetencyStatusParams, [name]: value })
                        }
                        const handleAddEducationToUpdateCompetencyStatusParams = () => {
                            const { lower_bound, upper_bound } = addEducationToUpdateCompetencyStatusParams;

                            // string değerleri sayıya dönüştür
                            const lower = parseFloat(lower_bound);
                            const upper = parseFloat(upper_bound);

                            if (isNaN(lower) || isNaN(upper)) {
                                alert("Lütfen geçerli sayısal değerler girin.");
                                return;
                            }

                            if (lower >= upper) {
                                alert("Alt aralık üst aralıktan küçük olmalıdır.");
                                return;
                            }

                            // Mevcut aralıklarla çakışma kontrolü
                            const isOverlap = rows.some(row => {
                                const rowLower = parseFloat(row.lower_bound);
                                const rowUpper = parseFloat(row.upper_bound);

                                return (lower >= rowLower && lower <= rowUpper) || (upper >= rowLower && upper <= rowUpper);
                            });

                            if (isOverlap) {
                                alert("Girilen aralık, mevcut aralıklarla çakışıyor.");
                                return;
                            }

                            // Yeni aralığı ekleme işlemi
                            setRows(prevRows => [
                                ...prevRows,
                                {
                                    id: prevRows.length + 1,
                                    lower_bound: lower_bound,
                                    upper_bound: upper_bound,
                                    competency_level: addEducationToUpdateCompetencyStatusParams.competency_level
                                }
                            ]);

                            // Formu temizle
                            setAddEducationToUpdateCompetencyStatusParams({
                                id: 1,
                                lower_bound: '',
                                upper_bound: '',
                                competency_level: ''
                            });
                        };
                        const [selectedRows, setSelectedRows] = useState<string[]>([]);

                        const handleSelectionModelChange = (newSelectionModel: any) => {
                            if (educationToUpdateCompetencyStatus && newSelectionModel.length > 1) {
                                setSelectedRows([newSelectionModel[newSelectionModel.length - 1]]);
                            } else {
                                setSelectedRows(newSelectionModel);
                            }
                            setForm({ ...form, relatedCompetencies: newSelectionModel });
                        };
                        useEffect(() => {
                            Services.Databases.listDocuments(
                                AppInfo.Name,
                                AppInfo.Database,
                                Collections.Parameter,
                                [
                                    Query.equal("name", "education_result_to_update_competency_status"),
                                    Query.limit(10000),
                                ]
                            ).then((res) => {
                                setEducationToUpdateCompetencyStatus(res.documents[0]?.is_active)
                            })
                        }, [])

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
                                                    rows={competencyList.filter(x => x.is_active_competency)}
                                                    columns={columns}
                                                    getRowId={(row) => row.$id}
                                                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                    isCellEditable={() => false}
                                                    disableRowSelectionOnClick
                                                    checkboxSelection
                                                    rowSelectionModel={selectedRows}
                                                    onRowSelectionModelChange={handleSelectionModelChange}
                                                    rowHeight={30}
                                                    columnHeaderHeight={30}
                                                />
                                            </div>
                                            <Autocomplete
                                                options={Resources.EducationTypes}
                                                value={Resources.EducationTypes.find((education_type) => education_type.id === form.type) || null}
                                                onChange={(event, newValue) => {
                                                    setForm({ ...form, type: newValue?.id || "" });
                                                }}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Eğitim Türü"
                                                        name="type"
                                                        size="small"
                                                        required
                                                    />
                                                )}
                                            />
                                            {
                                                educationToUpdateCompetencyStatus &&
                                                <div style={
                                                    {
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "10px",

                                                    }
                                                }>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        gap: "5px",
                                                    }}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            name="lower_bound"
                                                            inputProps={{ maxLength: 50 }}
                                                            label="Alt Aralık"
                                                            required
                                                            value={addEducationToUpdateCompetencyStatusParams.lower_bound}
                                                            onChange={handleChangeEducationToUpdateCompetencyStatusParams}
                                                        />
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            name="upper_bound"
                                                            inputProps={{ maxLength: 50 }}
                                                            label="Üst Aralık"
                                                            required
                                                            value={addEducationToUpdateCompetencyStatusParams.upper_bound}
                                                            onChange={handleChangeEducationToUpdateCompetencyStatusParams}
                                                        />
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            name="competency_level"
                                                            inputProps={{ maxLength: 50 }}
                                                            label="İlişkili Yetkinlik Seviyesi"
                                                            required
                                                            value={addEducationToUpdateCompetencyStatusParams.competency_level}
                                                            onChange={handleChangeEducationToUpdateCompetencyStatusParams}
                                                        />
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            onClick={handleAddEducationToUpdateCompetencyStatusParams}
                                                        >
                                                            Ekle
                                                        </Button>
                                                    </div>
                                                    <StyledDataGrid
                                                        rows={rows}
                                                        columns={educationToUpdateCompetencyStatusColums}
                                                        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                        isCellEditable={() => false}
                                                        disableRowSelectionOnClick
                                                        rowHeight={30}
                                                        columnHeaderHeight={30}
                                                    />
                                                </div>
                                            }
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