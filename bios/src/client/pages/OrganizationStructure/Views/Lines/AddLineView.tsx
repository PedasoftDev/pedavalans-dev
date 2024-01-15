import React, { useState, useEffect, Fragment } from 'react'
import Form from '../ViewForm/Form';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { GridColDef, trTR } from '@mui/x-data-grid';
import { Resources } from '../../../../assets/Resources';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Spinner, VStack, nanoid } from '@tuval/forms';
import OrganizationStructureLine from '../../../../../server/hooks/organizationStructureLine/main';
import { useGetMe } from '@realmocean/sdk';


const formLineState: IOrganizationStructure.ILines.ICreateLine = {
    id: "",
    record_id: "",
    name: "",
    department_id: "",
    department_name: "",
    realm_id: "",
    tenant_id: ""
}

const lineBasedCompetencyState = localStorage.getItem("line_based_competency_relationship") == "true" ? true : false;

const AddLineView = (
    props:
        {
            setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
            lines: IOrganizationStructure.ILines.ILine[],
            departments: IOrganizationStructure.IDepartments.IDepartment[],
        }
): JSX.Element => {

    const { createDocument, isLoading, error, isError, isSuccess } = OrganizationStructureLine.Create();
    const { me, isLoading: isLoadingMe } = useGetMe("console");

    const [formLine, setFormLine] = useState(formLineState);
    const [lineBasedCompetency, setLineBasedCompetency] = useState(lineBasedCompetencyState);
    // const [competenciesByDepartmentId, setCompetenciesByDepartmentId] = useState<IGetCompetencyResponse[]>([]);
    // const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>([]);
    // const [selectedCompetencyValues, setSelectedCompetencyValues] = useState<ICompetencyLineRelation.ICompetencyLineRelation[]>([]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.lines.find((line) => line.record_id == formLine.record_id)) {
            Toast.fire({
                icon: "error",
                title: "Bu kayıt kodu zaten kullanılmaktadır!",
            })
            return;
        }
        const id = nanoid();
        createDocument({
            documentId: id,
            data: {
                ...formLine,
                id: id,
                tenant_id: me?.prefs?.organization
            }
        }, () => {
            Toast.fire({
                icon: "success",
                title: "Hat başarıyla eklendi!",
            })
            props.setDefaultPage("");
        })
        if (!isLoading && isError) {
            Toast.fire({
                icon: "error",
                title: "Hat eklenirken bir hata oluştu!",
                text: error?.message
            })
        }
        // const closeEditLine = () => {
        //     Toast.fire({
        //         icon: "success",
        //         title: "Hat başarıyla eklendi!",
        //     })
        //     PolivalansBrokerClient.GetActiveOrganizationLines().then((response) => {
        //         setFormLine(formLineState);
        //         props.setDefaultPage("");
        //     })
        // }
        // PolivalansBrokerClient.CreateOrganizationStructureLine(formLine).then((response) => {
        //     if (lineBasedCompetency) {
        //         const sendingValues = []
        //         selectedCompetencies.forEach((competencyId) => {
        //             const findCompetency = selectedCompetencyValues.find((competency) => competency.competency_id == competencyId);
        //             if (findCompetency) {
        //                 sendingValues.push(findCompetency);
        //             }
        //         })
        //         PolivalansBrokerClient.UpdateCompetencyLineRelationTargetValue(response, sendingValues).then((response) => {
        //             closeEditLine()
        //         }).catch((error) => {
        //             Toast.fire({
        //                 icon: "error",
        //                 title: "Hat eklenirken bir hata oluştu!",
        //                 ...(error == "Hat kodu zaten kullanılmaktadır." ? { text: error } : {})
        //             })
        //         })
        //     } else {
        //         closeEditLine()
        //     }
        // }).catch((error) => {
        //     Toast.fire({
        //         icon: "error",
        //         title: "Hat eklenirken bir hata oluştu!",
        //         ...(error == "Hat kodu zaten kullanılmaktadır." ? { text: error } : {})
        //     })
        // })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormLine({ ...formLine, [e.target.name]: e.target.value });
    }

    const onReset = () => {
        setFormLine(formLineState);
        props.setDefaultPage("");
    }

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

    // useEffect(() => {
    //         lineBasedCompetency &&
    //             Promise.all([
    //                 PolivalansBrokerClient.GetCompetencyByDepartmentId(formLine.department_id)
    //             ]).then((response) => {
    //                 const [competenciesRes] = response;
    //                 setCompetenciesByDepartmentId(competenciesRes.map((competency) => {
    //                     return {
    //                         ...competency,
    //                         id: competency.competency_id,
    //                     }
    //                 }));
    //             })
    // }, [])

    return (
        isLoadingMe ?
            <Fragment>
                {VStack(Spinner()).render()}
            </Fragment> :
            <Form
                title='Yeni Hat Tanımlayın'
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
                                    // const updatedFormLine = {
                                    //     ...formLine,
                                    //     department_id: e.target.value as string,
                                    //     department_name: props.departments.find((department) => department.id == e.target.value)?.name || ""
                                    // };
                                    setFormLine({
                                        ...formLine,
                                        department_id: e.target.value as string,
                                        department_name: props.departments.find((department) => department.id == e.target.value)?.name || ""
                                    });

                                    // if (lineBasedCompetency) {
                                    //     PolivalansBrokerClient.GetCompetencyByDepartmentId(e.target.value as string).then((response) => {
                                    //         setCompetenciesByDepartmentId(response.map((competency) => ({
                                    //             ...competency,
                                    //             id: competency.competency_id,
                                    //         })));
                                    //         setFormLine(updatedFormLine);
                                    //     });
                                    // } else {
                                    //     setFormLine(updatedFormLine);
                                    // }
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
                            <Views.StyledDataGrid
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
                                                line_id: "",
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
                    </div>
                }

                buttons={[
                    {
                        text: "Kaydet",
                        color: "primary",
                        type: "submit"
                    },
                    {
                        text: "İptal",
                        color: "error",
                        type: "button",
                        onClick: onReset
                    }
                ]}
            />
    )
}

export default AddLineView