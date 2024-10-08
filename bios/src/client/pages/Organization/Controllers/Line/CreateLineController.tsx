import React, { useState } from 'react'
import { Autocomplete, FormControl, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { GridColDef, trTR } from '@mui/x-data-grid';
import { Resources } from '../../../../assets/Resources';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate } from '@tuval/forms';
import OrganizationStructureLine from '../../../../../server/hooks/organizationStructureLine/main';
import { useGetMe } from '@realmocean/sdk';
import Parameters from '../../../../../server/hooks/parameters/main';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import Competency from '../../../../../server/hooks/competency/main';
import ICompetencyLineRelation from '../../../../interfaces/ICompetencyLineRelation';
import CompetencyDepartment from '../../../../../server/hooks/competencyDepartment/main';
import CompetencyGradeValue from '../../../../../server/hooks/competencyGradeValue/main';
import CompetencyLineRelation from '../../../../../server/hooks/competencyLineRelation/main';
import AccountRelation from '../../../../../server/hooks/accountRelation/main';
import OrganizationStructureDepartment from '../../../../../server/hooks/organizationStructureDepartment/main';
import { Views } from '../../../../components/Views';
import { Form } from '../../Views/Views';


const formLineState: IOrganizationStructure.ILines.ICreateLine = {
  id: "",
  record_id: "",
  name: "",
  department_id: "",
  department_name: "",
  realm_id: "",
  tenant_id: ""
}

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 3)?.link;

export class CreateLineController extends UIController {

  public LoadView(): UIView {


    const [formLine, setFormLine] = useState(formLineState)

    const navigate = useNavigate();
    const { me, isLoading } = useGetMe("console");
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
    const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization)
    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)

    const { createDocument } = OrganizationStructureLine.Create();
    const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship)
    const { createCompetencyLineRelation } = CompetencyLineRelation.Create();
    const { competencyDepartments, isLoadingCompetencyDepartments } = CompetencyDepartment.GetByDepartmentId(formLine.department_id === "" ? "0" : formLine.department_id);

    const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);

    const { competencyGradeValueList, isLoadingCompetencyGradeValueList } = CompetencyGradeValue.GetList(me?.prefs?.organization);

    return (
      isLoading || isLoadingResult || isLoadingDepartments || isLoadingParameter || isLoadingCompetencyDepartments || isLoadingCompetencyGradeValueList || isLoadingLines || isLoadingCompetencyList ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {

          const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>([]);
          const [selectedCompetencyValues, setSelectedCompetencyValues] = useState<ICompetencyLineRelation.ICompetencyLineRelation[]>([]);

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
                  selectedCompetencies.includes(params.row.competency_id) ?
                    <FormControl fullWidth size="small">
                      <Select
                        name="competency_values"
                        value={selectedCompetencyValues.find((competencyValue) => competencyValue.competency_id == params.row.competency_id)?.competency_target_value ?? ""}
                        onChange={(e: SelectChangeEvent) => {
                          setSelectedCompetencyValues(selectedCompetencyValues.map((competencyValue) => {
                            if (competencyValue.competency_id == params.row.competency_id) {
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
                        {competencyGradeValueList?.filter(x => x.competency_id === params.row.competency_id).sort((a: any, b: any) => a.grade_level_number - b.grade_level_number)
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

          const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormLine({ ...formLine, [e.target.name]: e.target.value });
          }

          const onReset = () => {
            navigate(link + "/list")
          }

          const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (lines.find((line) => line.record_id == formLine.record_id)) {
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
              onReset();
              // if (lineBased[0]?.is_active) {
              //   selectedCompetencies.forEach((competencyId, i) => {
              //     const findCompetency = selectedCompetencyValues.find((competency) => competency.competency_id == competencyId);
              //     if (findCompetency) {
              //       const lineRelId = nanoid();
              //       createCompetencyLineRelation({
              //         documentId: lineRelId,
              //         data: {
              //           id: lineRelId,
              //           competency_id: findCompetency.competency_id,
              //           competency_target_value: findCompetency.competency_target_value,
              //           line_id: id,
              //           tenant_id: me?.prefs?.organization
              //         }
              //       })
              //     }
              //     if (i === selectedCompetencies.length - 1) {
              //       Toast.fire({
              //         icon: "success",
              //         title: "Hat başarıyla eklendi!",
              //       })
              //       onReset();
              //     }
              //   })
              // } else {
              //   Toast.fire({
              //     icon: "success",
              //     title: "Hat başarıyla eklendi!",
              //   })
              //   onReset();
              // }
            })
          }

          const filteredCompetencyList = lineBased[0]?.is_active && competencyList && competencyDepartments ? competencyList.filter(x =>
            competencyDepartments.find(y => y.competency_id == x.competency_id) ? true : false) :
            competencyList ? competencyList : [];

          return (
            VStack({ alignment: cTop })(
              HStack({ alignment: cLeading })(
                Views.Title("Organizasyon Yapısı").paddingTop("20px")
              ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
              VStack({ alignment: cTop })(
                ReactView(
                  <div style={{ width: "100%", height: "100%" }}>
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
                            <Autocomplete
                              options={departments}
                              getOptionLabel={(option) => option.name}
                              value={departments.find((department) => department.id == formLine.department_id) || null}
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  setFormLine({
                                    ...formLine,
                                    department_id: newValue.id,
                                    department_name: newValue.name
                                  });
                                  setSelectedCompetencyValues([]);
                                  setSelectedCompetencies([]);
                                }
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Bağlı Olduğu Departman"
                                  size="small"
                                />
                              )}
                            />
                          </FormControl>
                          {/* {
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
                                        line_id: "",
                                        id: "",
                                        is_active: true,
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
                  </div>

                )
              ).paddingTop("10px")
            ).padding("0 10px 0 20px")
          )
        })
    )
  }
}