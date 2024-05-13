import React, { useState, useEffect, Fragment } from 'react'
import Form from '../ViewForm/Form';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { GridColDef, trTR } from '@mui/x-data-grid';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import { Toast } from '../../../../components/Toast';
import OrganizationStructureLine from '../../../../../server/hooks/organizationStructureLine/main';
import AppInfo from '../../../../../AppInfo';
import Parameters from '../../../../../server/hooks/parameters/main';
import { Resources } from '../../../../assets/Resources';
import { useGetMe } from '@realmocean/sdk';
import ICompetency from '../../../../interfaces/ICompetency';
import ICompetencyLineRelation from '../../../../interfaces/ICompetencyLineRelation';
import CompetencyGradeValue from '../../../../../server/hooks/competencyGradeValue/main';
import { ReactView, Spinner, UIViewBuilder, VStack, nanoid } from '@tuval/forms';
import Competency from '../../../../../server/hooks/competency/main';
import CompetencyDepartment from '../../../../../server/hooks/competencyDepartment/main';
import CompetencyLineRelation from '../../../../../server/hooks/competencyLineRelation/main';
import removeDollarProperties from '../../../../assets/Functions/removeDollarProperties';

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
    const { me, isLoading: isLoadingMe } = useGetMe("console");

    const [formLine, setFormLine] = useState(props.selectedLine);
    const [isActive, setIsActive] = useState(props.selectedLine.is_active);

    const { updateLine, isLoading: isLoadingLine, error, isError, isSuccess } = OrganizationStructureLine.Update();

    const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship)


    const { competencyDepartments, isLoadingCompetencyDepartments } = CompetencyDepartment.GetByDepartmentId(formLine.department_id === "" ? "0" : formLine.department_id);

    const { competencyLineRelation, isLoading: isLoadingCompetencyLineRelation } = CompetencyLineRelation.GetByLineId(props.selectedLine.id, me?.prefs?.organization);
    const { updateCompetencyLineRelation } = CompetencyLineRelation.Update();
    const { createCompetencyLineRelation } = CompetencyLineRelation.Create();


    const { competencyList, isLoadingCompetencyList, totalCompetencyList } = Competency.GetList(me?.prefs?.organization);
    const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>([]);
    const [selectedCompetencyValues, setSelectedCompetencyValues] = useState<ICompetencyLineRelation.ICompetencyLineRelation[]>([]);

    // competency grade values
    const { competencyGradeValueList, isLoadingCompetencyGradeValueList } = CompetencyGradeValue.GetList(me?.prefs?.organization);




    return (
        isLoadingLine || isLoadingMe || isLoadingParameter || isLoadingCompetencyLineRelation || isLoadingCompetencyGradeValueList || isLoadingCompetencyDepartments || isLoadingCompetencyList ?
            <Fragment>
                {VStack(Spinner()).render()}
            </Fragment>
            :
            <Fragment>
                {UIViewBuilder(() => {
                    const filteredCompetencyList = lineBased[0]?.is_active && competencyList && competencyDepartments ? competencyList.filter(x =>
                        competencyDepartments.find(y => y.competency_id == x.competency_id) ? true : false) :
                        competencyList ? competencyList : [];


                    const competencyColumns: GridColDef[] = [
                        {
                            field: "competency_name",
                            headerName: "Yetkinlik Adı",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1
                        },
                        {
                            field: "competency_group_name",
                            headerName: "Yetkinlik Grubu",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1
                        },
                        {
                            field: "competency_values",
                            headerName: "Yetkinlik Hedef Değerleri",
                            minWidth: 100,
                            width: 100,
                            editable: false,
                            disableColumnMenu: true,
                            renderCell(params) {
                                return (
                                    // select olacak
                                    selectedCompetencies.includes(params.row.$id) ?
                                        <FormControl fullWidth size="small">
                                            <Select
                                                name="competency_values"
                                                value={selectedCompetencyValues.find((competencyValue) => competencyValue.competency_id == params.row.$id)?.competency_target_value ?? ""}
                                                onChange={(e: SelectChangeEvent) => {
                                                    setSelectedCompetencyValues(selectedCompetencyValues.map((competencyValue) => {
                                                        if (competencyValue.competency_id == params.row.$id) {
                                                            return {
                                                                ...competencyValue,
                                                                competency_target_value: e.target.value
                                                            }
                                                        }
                                                        return competencyValue;
                                                    }))
                                                }}
                                                required
                                                size="small"
                                            >
                                                {competencyGradeValueList.filter(x => x.competency_id === params.row.$id).sort((a: any, b: any) => a.grade_level_number - b.grade_level_number)
                                                    .map((competencyValue: any) => {
                                                        return (
                                                            <MenuItem key={competencyValue.grade_level_number} value={competencyValue.grade_level_number}>{competencyValue.grade_level_number}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                        :
                                        null
                                )
                            },
                        }
                    ];

                    useEffect(() => {
                        if (lineBased[0]?.is_active) {
                            setSelectedCompetencies(competencyLineRelation.map((competency) => competency.competency_id))
                            setSelectedCompetencyValues(competencyLineRelation)
                        }
                    }, [])

                    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormLine({ ...formLine, [e.target.name]: e.target.value });
                    }

                    const onReset = () => {
                        props.setLinesActives(true);
                        setFormLine(formLineState);
                        props.setDefaultPage("");
                    }

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
                        updateLine({
                            databaseId: AppInfo.Database,
                            collectionId: "organization_line",
                            documentId: formLine.id,
                            data: formLine
                        }, () => {
                            if (lineBased[0]?.is_active) {
                                competencyLineRelation.forEach((competency) => {
                                    if (!selectedCompetencies.includes(competency.competency_id)) {
                                        updateCompetencyLineRelation({
                                            databaseId: AppInfo.Database,
                                            collectionId: "competency_line_relation",
                                            documentId: competency.id,
                                            data: {
                                                ...competency,
                                                is_deleted: true
                                            }
                                        })
                                    }
                                })
                                selectedCompetencies.forEach((competencyId) => {
                                    if (!competencyLineRelation.some((competency) => competency.competency_id == competencyId)) {
                                        const docId = nanoid();
                                        createCompetencyLineRelation({
                                            documentId: docId,
                                            data: {
                                                id: docId,
                                                competencyId: competencyId,
                                                competency_target_value: selectedCompetencyValues.find((competency) => competency.competency_id == competencyId)?.competency_target_value ?? "",
                                                line_id: formLine.id,
                                                tenant_id: me?.prefs?.organization,
                                            }
                                        })
                                    } else {
                                        const competencyLineRelationItem = removeDollarProperties(selectedCompetencyValues.find((competency) => competency.competency_id == competencyId));
                                        updateCompetencyLineRelation({
                                            databaseId: AppInfo.Database,
                                            collectionId: "competency_line_relation",
                                            documentId: competencyLineRelationItem?.id ?? "",
                                            data: {
                                                ...competencyLineRelationItem,
                                                competency_target_value: selectedCompetencyValues.find((competency) => competency.competency_id == competencyId)?.competency_target_value ?? "",
                                            }
                                        })
                                    }
                                })
                            }
                            setTimeout(() => {
                                Toast.fire({
                                    icon: "success",
                                    title: "Hat başarıyla düzenlendi!",
                                })
                                onReset();
                            }, 500);
                        })
                        // TODO: Polivalans Broker
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
                            updateLine({
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
                        })
                    }

                    return ReactView(
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

                                    {
                                        lineBased[0]?.is_active &&
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
                                                rows={filteredCompetencyList}
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
                                                                is_active: true,
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
                                                getRowId={(row) => row.$id}
                                            />
                                        </div>
                                    }

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
                }).render()}
            </Fragment>
    )
}

export default EditLineView