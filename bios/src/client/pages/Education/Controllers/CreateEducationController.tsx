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
} from "@mui/material";
import { useGetMe } from "@realmocean/sdk";
import Competency from "../../../../server/hooks/competency/main";
import { Resources } from "../../../assets/Resources";
import Form from "../../Competency/Views/Form";

interface ICreateEducation {
    code: string;
    description: string;
    relatedCompetencies: string[];
    type: string[];
}

const resetForm: ICreateEducation = {
    code: "",
    description: "",
    relatedCompetencies: [],
    type: [],
};

export class CreateEducationController extends UIFormController {

    public LoadView(): UIView {
        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console")
        const navigateToList = () => navigate("/app/education/list");
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization)



        return (
            VStack({ alignment: cTop })(
                isLoading || isLoadingCompetencyList ? VStack(Spinner()) :
                    UIViewBuilder(() => {

                        const [form, setForm] = useState<ICreateEducation>(resetForm);

                        const handleChangeText = (e: any) => {
                            const { name, value } = e.target;

                            setForm({ ...form, [name]: value });
                        };

                        const handleChangeSelect = (event: SelectChangeEvent<any>) => {
                            const { name, value } = event.target;

                            setForm({
                                ...form,
                                [name]: typeof value === "string" ? value.split(",") : value,
                            });
                        };

                        const handleSubmit = (e: React.FormEvent) => {
                            e.preventDefault();

                            const isAny = localStorage.getItem("educationList");

                            if (isAny) {
                                const list: any[] = JSON.parse(isAny);

                                list.push({
                                    ...form,
                                    id: list.length + 1,
                                });
                                localStorage.setItem("educationList", JSON.stringify(list));
                                navigateToList();
                            } else {
                                const appendList = JSON.stringify([
                                    {
                                        ...form,
                                        id: 1,
                                    },
                                ]);
                                localStorage.setItem("educationList", appendList);
                                navigateToList();
                            }
                        };

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
                                            />
                                            <TextField
                                                fullWidth
                                                onChange={handleChangeText}
                                                value={form.description}
                                                name="description"
                                                multiline={true}
                                                rows={4}
                                                label="Eğitim Tanımı"
                                            />
                                            <FormControl fullWidth size="small" required>
                                                <InputLabel>İlişkili Yetkinlikler</InputLabel>
                                                <Select
                                                    multiple
                                                    name="relatedCompetencies"
                                                    label="İlişkili Yetkinlikler"
                                                    value={form.relatedCompetencies}
                                                    onChange={handleChangeSelect}
                                                    size="small"
                                                    required
                                                >
                                                    {competencyList.map((competency) => (
                                                        <MenuItem value={competency.competency_name} key={competency.$id}>
                                                            {competency.competency_name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
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
                                                            value={education_type.name}
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