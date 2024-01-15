import React, { useState, useEffect } from 'react'
import Form from '../ViewForm/Form';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { GridColDef, trTR } from '@mui/x-data-grid';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import { Toast } from '../../../../components/Toast';
import OrganizationStructureLine from '../../../../../server/hooks/organizationStructureLine/main';
import AppInfo from '../../../../../AppInfo';

const lineBasedCompetencyState = localStorage.getItem("line_based_competency_relationship") == "true" ? true : false;

const formLineState: IOrganizationStructure.ILines.ILine = {
    id: "",
    record_id: "",
    name: "",
    department_id: "",
    department_name: "",
    is_active: true,
    is_deleted: false,
    realm_id: "",
    tenant_id: "",
}

const EditLineView = (props: {
    selectedLine: IOrganizationStructure.ILines.ILine,
    setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
    setLinesActives: React.Dispatch<React.SetStateAction<boolean>>,
    lines: IOrganizationStructure.ILines.ILine[],
    departments: IOrganizationStructure.IDepartments.IDepartment[],
}) => {

    const [formLine, setFormLine] = useState(props.selectedLine);
    const [isActive, setIsActive] = useState(props.selectedLine.is_active);

    const [lineBasedCompetency, setLineBasedCompetency] = useState(lineBasedCompetencyState);

    const { updateDocument, isLoading, error, isError, isSuccess } = OrganizationStructureLine.Update();

    // const competencyColumns: GridColDef[] = [
    //     {
    //         field: "competency_name",
    //         headerName: "Yetkinlik Adı",
    //         minWidth: 200,
    //         editable: false,
    //         disableColumnMenu: true,
    //         flex: 1
    //     },
    //     {
    //         field: "competency_group_name",
    //         headerName: "Yetkinlik Grubu",
    //         minWidth: 200,
    //         editable: false,
    //         disableColumnMenu: true,
    //         flex: 1
    //     },
    //     {
    //         field: "competency_values",
    //         headerName: "Yetkinlik Hedef Değerleri",
    //         minWidth: 100,
    //         width: 100,
    //         editable: false,
    //         disableColumnMenu: true,
    //         renderCell(params) {
    //             return (
    //                 // select olacak
    //                 selectedCompetencies.includes(params.row.id) ?
    //                     <FormControl fullWidth size="small">
    //                         <Select
    //                             name="competency_values"
    //                             value={selectedCompetencyValues.find((competencyValue) => competencyValue.competency_id == params.row.id)?.competency_target_value ?? ""}
    //                             onChange={(e: SelectChangeEvent) => {
    //                                 setSelectedCompetencyValues(selectedCompetencyValues.map((competencyValue) => {
    //                                     if (competencyValue.competency_id == params.row.id) {
    //                                         return {
    //                                             ...competencyValue,
    //                                             competency_target_value: e.target.value
    //                                         }
    //                                     }
    //                                     return competencyValue;
    //                                 }))
    //                             }}
    //                             required
    //                             size="small"
    //                         >
    //                             {params.row.competency_values.sort((a: any, b: any) => a.grade_level_number - b.grade_level_number)
    //                                 .map((competencyValue: any) => {
    //                                     return (
    //                                         <MenuItem key={competencyValue.grade_level_number} value={competencyValue.grade_level_number}>{competencyValue.grade_level_number}</MenuItem>
    //                                     )
    //                                 })
    //                             }
    //                         </Select>
    //                     </FormControl>
    //                     :
    //                     null
    //             )
    //         },
    //     }
    // ];


    // const [competenciesByDepartmentId, setCompetenciesByDepartmentId] = useState<IGetCompetencyResponse[]>([]);
    // const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>([]);

    // const [selectedCompetencyValues, setSelectedCompetencyValues] = useState<ICompetencyLineRelation.ICompetencyLineRelation[]>([]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.lines.some((document) => document.record_id == formLine.record_id && document.id != formLine.id)) {
            Toast.fire({
                icon: "error",
                title: "Hat eklenirken bir hata oluştu!",
                text: "Hat kodu zaten kullanılmaktadır."
            })
            return;
        }
        updateDocument({
            databaseId: AppInfo.Database,
            collectionId: "organization_line",
            documentId: formLine.id,
            data: formLine
        }, () => {
            Toast.fire({
                icon: "success",
                title: "Hat başarıyla düzenlendi!",
            })
            onReset();
        })
        if (!isLoading && isError) {
            Toast.fire({
                icon: "error",
                title: "Hat düzenlenirken bir hata oluştu!",
                text: error?.message
            })
            onReset();
        }
        // PolivalansBrokerClient.UpdateOrganizationStructureLine(formLine).then((response) => {
        //     if (lineBasedCompetency) {
        //         const sendingValues = []
        //         selectedCompetencies.forEach((competencyId) => {
        //             const findCompetency = selectedCompetencyValues.find((competency) => competency.competency_id == competencyId);
        //             if (findCompetency) {
        //                 sendingValues.push(findCompetency);
        //             }
        //         })
        //         PolivalansBrokerClient.UpdateCompetencyLineRelationTargetValue(formLine.id, sendingValues).then((response) => {
        //             Views.Toast.fire({
        //                 icon: "success",
        //                 title: "Hat başarıyla düzenlendi!",
        //             })
        //             PolivalansBrokerClient.GetActiveOrganizationLines().then((response) => {
        //                 closeEditLine(response)
        //             })
        //         })

        //     } else {
        //         Toast.fire({
        //             icon: "success",
        //             title: "Hat başarıyla düzenlendi!",
        //         })
        //         // PolivalansBrokerClient.GetActiveOrganizationLines().then((response) => {
        //         //     closeEditLine(response)
        //         // })
        //     }
        // }).catch((error) => {
        //     Toast.fire({
        //         icon: "error",
        //         title: "Hat düzenlenirken bir hata oluştu!",
        //         ...(error == "Hat kodu zaten kullanılmaktadır." ? { text: error } : {})
        //     })
        // })

    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormLine({ ...formLine, [e.target.name]: e.target.value });
    }

    const onReset = () => {
        props.setLinesActives(true);
        setFormLine(formLineState);
        props.setDefaultPage("");
    }

    // useEffect(() => {
    //     PolivalansBrokerClient.GetActiveOrganizationDepartments().then((response) => {
    //         setDepartments(response)
    //         lineBasedCompetency &&
    //             Promise.all([
    //                 PolivalansBrokerClient.GetCompetencyByDepartmentId(formLine.department_id),
    //                 PolivalansBrokerClient.GetCompetencyLineRelationByLineId(formLine.id)
    //             ]).then((response) => {
    //                 const [competenciesRes, competencyLineRes] = response;
    //                 const competencyIds = competencyLineRes.map((competency) => competency.competency_id);
    //                 setCompetenciesByDepartmentId(competenciesRes.map((competency) => {
    //                     return {
    //                         ...competency,
    //                         id: competency.competency_id,
    //                     }
    //                 }));
    //                 setSelectedCompetencyValues(competencyLineRes);
    //                 setSelectedCompetencies(competencyIds)
    //             })
    //     })

    // }, [])

    const onDelete = () => {
        Swal.fire({
            title: "Hat Silme",
            text: `${formLine.name} adlı Hat silinecek!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Evet, sil!",
            cancelButtonText: "Hayır, iptal et!"
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }
            updateDocument({
                databaseId: AppInfo.Database,
                collectionId: "organization_line",
                documentId: formLine.id,
                data: {
                    ...formLine,
                    is_deleted: true
                }
            }, () => {
                Toast.fire({
                    icon: "success",
                    title: "Hat başarıyla silindi!",
                })
                onReset();
            })
            if (!isLoading && isError) {
                Toast.fire({
                    icon: "error",
                    title: "Hat silinirken bir hata oluştu!",
                    text: error?.message
                })
                onReset();
            }
        })
    }

    return (
        <Form
            title='Tanımlı Hattı Düzenleyin'
            onSubmit={onSubmit}
            formContent={
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                    <TextField
                        name='record_id'
                        size='small'
                        label='Kayıt Kodu'
                        value={formLine.record_id}
                        onChange={onChange}
                    />
                    <TextField
                        name='name'
                        size='small'
                        label='Hat Adı'
                        value={formLine.name}
                        onChange={onChange}
                    />
                    <FormControl fullWidth size="small">
                        <InputLabel>Bağlı Olduğu Departman</InputLabel>
                        <Select
                            name="department_id"
                            value={formLine.department_id}
                            label="Bağlı Olduğu Departman"
                            onChange={(e: SelectChangeEvent) => {
                                // lineBasedCompetency ?
                                //     PolivalansBrokerClient.GetCompetencyByDepartmentId(e.target.value as string).then((response) => {
                                //         setCompetenciesByDepartmentId(response.map((competency) => {
                                //             return {
                                //                 ...competency,
                                //                 id: competency.competency_id,
                                //             }
                                //         }));
                                //         const findDepartment = departments.find((department) => department.id == e.target.value);
                                //         setFormLine({
                                //             ...formLine,
                                //             department_id: e.target.value as string,
                                //             department_name: findDepartment.name
                                //         })
                                //     })
                                //     :
                                setFormLine({
                                    ...formLine,
                                    department_id: e.target.value as string,
                                    department_name: props.departments.find((department) => department.id == e.target.value).name
                                })
                            }}
                            required
                            size="small"
                        >
                            {props.departments.map((department) => {
                                return (
                                    <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    {/* {
                        lineBasedCompetency &&
                        <div style={{
                            height: "280px",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                        }}>
                            <Typography variant="button" sx={{ marginLeft: "10px" }}>Hatta Bulunan Yetkinlikler</Typography>
                            <StyledDataGrid
                                // çoklu id ye göre filtreleme yapılacak
                                rows={competenciesByDepartmentId}
                                columns={competencyColumns}
                                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                isCellEditable={() => false}
                                disableRowSelectionOnClick
                                checkboxSelection
                                onRowSelectionModelChange={(newRowSelectionModel: any) => {
                                    setSelectedCompetencies(newRowSelectionModel)
                                    newRowSelectionModel.forEach((competencyId: string) => {
                                        const findCompetency = selectedCompetencyValues.find((competency) => competency.competency_id == competencyId);
                                        if (!findCompetency) {
                                            setSelectedCompetencyValues([...selectedCompetencyValues, {
                                                competency_id: competencyId,
                                                competency_target_value: "",
                                                line_id: formLine.id,
                                                updated_at: new Date().toISOString(),
                                                created_at: new Date().toISOString(),
                                                created_by: "",
                                                updated_by: "",
                                                id: "",
                                                is_deleted: false,
                                                realm_id: "",
                                                tenant_id: ""
                                            }])
                                        }
                                    })
                                }}
                                rowSelectionModel={selectedCompetencies}
                                rowHeight={40}
                                columnHeaderHeight={30}
                            />
                        </div>
                    } */}

                    <FormControlLabel
                        sx={{ width: "100%", alignContent: "end" }}
                        onChange={(e: any) => setFormLine({ ...formLine, is_active: e.target.checked })}
                        value={formLine.is_active}
                        control={<Switch color="primary" checked={formLine.is_active} />}
                        label="Aktif mi?"
                        labelPlacement="start"
                    />

                </div>
            }

            buttons={isActive ?
                [
                    {
                        text: "Güncelle",
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
    )
}

export default EditLineView