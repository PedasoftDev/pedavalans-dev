import { HStack, ReactView, Spinner, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, nanoid, useNavigate, useParams } from "@tuval/forms";
import AccountRelation from "../../../../../server/hooks/accountRelation/main";
import OrganizationStructureLine from "../../../../../server/hooks/organizationStructureLine/main";
import { useGetMe } from "@realmocean/sdk";
import { Views } from "../../../../components/Views";
import React, { useEffect, useState } from "react";
import { Form } from "../../Views/Views";
import { Autocomplete, FormControl, FormControlLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from "@mui/material";
import { Resources } from "../../../../assets/Resources";
import { Toast } from "../../../../components/Toast";
import { IOrganizationStructure } from "../../../../interfaces/IOrganizationStructure";
import AppInfo from "../../../../../AppInfo";
import removeDollarProperties from "../../../../assets/Functions/removeDollarProperties";
import Swal from "sweetalert2";
import Parameters from "../../../../../server/hooks/parameters/main";
import CompetencyLineRelation from "../../../../../server/hooks/competencyLineRelation/main";
import CompetencyDepartment from "../../../../../server/hooks/competencyDepartment/main";
import Competency from "../../../../../server/hooks/competency/main";
import ICompetencyLineRelation from "../../../../interfaces/ICompetencyLineRelation";
import CompetencyGradeValue from "../../../../../server/hooks/competencyGradeValue/main";
import { GridColDef, trTR } from "@mui/x-data-grid";
import StyledDataGrid from "../../../../components/StyledDataGrid";
import OrganizationStructureDepartment from "../../../../../server/hooks/organizationStructureDepartment/main";
import Collections from "../../../../../server/core/Collections";

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

const link: string = Resources.OrganizationStructureTabValues.find((tab) => tab.value === 3)?.link;

export class UpdateLineController extends UIController {

  public LoadView(): UIView {
    const navigate = useNavigate();
    const { me, isLoading } = useGetMe("console");
    const { id } = useParams()
    const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
    const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization)
    const { updateLine } = OrganizationStructureLine.Update()
    const { line, isLoadingLine } = OrganizationStructureLine.Get(id)
    const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship)


    const { competencyDepartments, isLoadingCompetencyDepartments } = CompetencyDepartment.GetByDepartmentId(line?.department_id === "" ? "0" : line?.department_id);

    const { competencyLineRelation, isLoading: isLoadingCompetencyLineRelation } = CompetencyLineRelation.GetByLineId(id, me?.prefs?.organization);
    const { updateCompetencyLineRelation } = CompetencyLineRelation.Update();
    const { createCompetencyLineRelation } = CompetencyLineRelation.Create();


    const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);

    // competency grade values
    const { competencyGradeValueList, isLoadingCompetencyGradeValueList } = CompetencyGradeValue.GetList(me?.prefs?.organization);

    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetActiveList(me?.prefs?.organization);

    return (
      isLoading || isLoadingResult || isLoadingDepartments || isLoadingCompetencyList || isLoadingCompetencyDepartments || isLoadingCompetencyGradeValueList || isLoadingParameter || isLoadingCompetencyLineRelation || isLoadingLines || isLoadingLine ? (me === undefined || accountRelations === undefined) ? UINavigate("/login") :
        VStack(Spinner()) :
        UIViewBuilder(() => {

          const [formLine, setFormLine] = useState(formLineState)
          const [isActive, setIsActive] = useState(true)

          const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>([]);
          const [selectedCompetencyValues, setSelectedCompetencyValues] = useState<ICompetencyLineRelation.ICompetencyLineRelation[]>([]);

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
            setFormLine(removeDollarProperties(line))
          }, [])

          const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormLine({ ...formLine, [e.target.name]: e.target.value });
          }

          const onReset = () => {
            navigate(link + "/list")
          }

          const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (lines.some((document) => document.record_id == formLine.record_id && document.id != formLine.id)) {
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
              // if (lineBased[0]?.is_active) {
              //   const values = competencyLineRelation;
              //   values.forEach((value) => {
              //     updateCompetencyLineRelation({
              //       databaseId: AppInfo.Database,
              //       collectionId: Collections.CompetencyLineRelation,
              //       documentId: value.$id,
              //       data: {
              //         is_deleted: true
              //       }
              //     })
              //   })
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
              Toast.fire({
                icon: "success",
                title: "Hat başarıyla eklendi!",
              })
              onReset();
            })
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


          return (
            VStack({ alignment: cTop })(
              HStack({ alignment: cLeading })(
                Views.Title("Organizasyon Yapısı").paddingTop("20px")
              ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
              VStack({ alignment: cTop })(
                ReactView(
                  <div style={{ width: "100%", height: "100%" }}>
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
                        ]
                        :
                        [
                          {
                            text: "Kaydet",
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
                  </div>

                )
              ).paddingTop("10px")
            ).padding("0 10px 0 20px")
          )
        })
    )
  }
}