import { ReactView, Spinner, UIFormController, UIView, UIViewBuilder, VStack, cTop, nanoid, useNavigate, useParams } from "@tuval/forms";
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
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Query, Services, useDeleteCache, useGetMe } from "@realmocean/sdk";
import Competency from "../../../../server/hooks/competency/main";
import { Resources } from "../../../assets/Resources";
import Form from "../../Competency/Views/Form";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import IEducation from "../../../interfaces/IEducation";
import Education from "../../../../server/hooks/education/main";
import EducationCompetencyRelation from "../../../../server/hooks/educationCompetencyRelation/main";
import { Toast } from "../../../components/Toast";
import IEducationCompetencyRelation from "../../../interfaces/IEducationCompetencyRelation";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import Swal from "sweetalert2";
import EducationCompetencyStatusInfos from "../../../../server/hooks/educationCompetencyStatusInfos/Main";
import CompetencyGrade from "../../../../server/hooks/competencyGrade/main";
import CompetencyGroup from "../../../../server/hooks/competencyGroup/main";
import { FaPlus } from "react-icons/fa6";
import IEducationCompetencyStatusInfos from "../../../interfaces/IEducationCompetencyStatusInfos";


const resetForm: IEducation.IBase = {
  code: "",
  name: "",
  type: "",
  tenant_id: "",
  is_active: true,
  is_deleted: false,
};
const educationToUpdateCompetencyStatusParams = {
  id: 1,
  lower_bound: "",
  upper_bound: "",
  competency_level: "",
}

export class UpdateEducationController extends UIFormController {

  public LoadView(): UIView {

    const navigate = useNavigate();
    const { id } = useParams();

    const { me, isLoading } = useGetMe("console")
    const { deleteCache } = useDeleteCache(AppInfo.Name)

    const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization)
    const { updateEducation } = Education.Update()
    const { education, isLoading: isLoadingGetEducation } = Education.Get(id)
    const { educationCompetencyRelationList, isLoading: isLoadingEducationCompetencyRelationList } = EducationCompetencyRelation.ListByEducation(id)

    const { createEducationCompetencyRelation } = EducationCompetencyRelation.Create()
    const { updateEducationCompetencyRelation } = EducationCompetencyRelation.Update()
    const { educationList, isLoading: isLoadingEducation } = Education.GetList()
    const { educationCompetencyStatusList, isLoading: isLoadingEducationCompetencyStatusInfos } = EducationCompetencyStatusInfos.GetList(me?.prefs?.organization)
    const { updateEducationCompetencyStatusInfos } = EducationCompetencyStatusInfos.Update()
    const { levels, isLoadingLevels } = CompetencyGrade.GetGradeLevelList();
    const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization);

    return (
      VStack({ alignment: cTop })(
        isLoading || isLoadingCompetencyList || isLoadingLevels || isLoadingGroups || isLoadingEducation || isLoadingEducationCompetencyStatusInfos || isLoadingGetEducation || isLoadingEducationCompetencyRelationList ? VStack(Spinner()) :
          UIViewBuilder(() => {

            const [form, setForm] = useState<IEducation.IBase>(resetForm);
            const [educationCompetencyRelation, setEducationCompetencyRelation] = useState<string[]>([]);
            const [isActive, setIsActive] = useState<boolean>(true);

            const [educationToUpdateCompetencyStatus, setEducationToUpdateCompetencyStatus] = useState<boolean>(false)
            const [rows, setRows] = useState([])

            const [addCompetencyLevel, setAddCompetencyLevel] = useState<string>("")
            const handleChange = (event: SelectChangeEvent) => {
              setAddCompetencyLevel(event.target.value as string);
              setSelectedRow({ ...selectedRow, competency_level: event.target.value as string })

            };
            const [selectedCompetencyId, setSelectedCompetencyId] = useState<string[]>([]);
            const [selectedRow, setSelectedRow] = useState(null);


            const [editMode, setEditMode] = useState<boolean>(false)
            const navigateToList = () => navigate("/app/education/list");

            const handleChangeText = (e: any) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            };

            const handleSubmit = (e: React.FormEvent) => {
              e.preventDefault();
              if (educationList.some((education) => education.$id != form.$id && education.code === form.code)) {
                Toast.fire({
                  icon: "error",
                  title: "Bu eğitim katalog kodu zaten mevcut!"
                });
                return;
              }
              updateEducation({
                databaseId: AppInfo.Database,
                collectionId: Collections.Education,
                documentId: id,
                data: removeDollarProperties(form)
              }, () => {
                educationCompetencyRelationList.forEach((relation) => {
                  updateEducationCompetencyRelation({
                    databaseId: AppInfo.Database,
                    collectionId: Collections.EducationCompetencyRelation,
                    documentId: relation.$id,
                    data: {
                      is_deleted: true,
                      is_active: false
                    }
                  })
                })
                educationCompetencyRelation.forEach((competency_id, i) => {
                  const nanoId = nanoid();
                  createEducationCompetencyRelation({
                    documentId: nanoId,
                    data: {
                      education_id: id,
                      competency_id: competency_id,
                      competency_name: competencyList.find((c) => c.$id === competency_id)?.competency_name,
                      tenant_id: me?.prefs?.organization,
                    }
                  }, () => {
                    if (i === educationCompetencyRelation.length - 1) {
                      Toast.fire({
                        icon: "success",
                        title: "Eğitim başarıyla güncellendi!"
                      });
                      deleteCache();
                      navigateToList();
                    }
                  })
                })
                for (let i = 0; i < rows.length; i++) {
                  const educationCompetencyStatusInfos: IEducationCompetencyStatusInfos.IBase = {
                    education_id: id,
                    id: rows[i].id,
                    competency_id: selectedCompetencyId[0],
                    lower_bound: rows[i].lower_bound,
                    upper_bound: rows[i].upper_bound,
                    competency_level: rows[i].competency_level,
                    competency_level_id: levels.find((x) => x.grade_level_name === rows[i].competency_level)?.grade_id,
                    tenant_id: me?.prefs?.organization,
                    is_active: true,
                    is_deleted: false
                  }
                  updateEducationCompetencyStatusInfos({
                    databaseId: AppInfo.Database,
                    collectionId: Collections.EducationCompetencyStatusInfos,
                    documentId: educationCompetencyStatusInfos.id,
                    data: educationCompetencyStatusInfos
                  })
                }
                if (educationCompetencyRelation.length === 0) {
                  Toast.fire({
                    icon: "success",
                    title: "Eğitim başarıyla güncellendi!"
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
              },
              {
                field: "actions",
                headerName: "Düzenle",
                flex: 1,
                align: "center",
                renderCell: (params) => {
                  return (
                    <div>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setEditMode(true);
                          setSelectedRow(params.row)

                        }}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                          const { id } = params.row
                          const newRows = rows.filter((row) => row.id !== id)
                          setRows(newRows)
                          updateEducationCompetencyStatusInfos({
                            databaseId: AppInfo.Database,
                            collectionId: Collections.EducationCompetencyStatusInfos,
                            documentId: id,
                            data: {
                              is_deleted: true,
                              is_active: false
                            }
                          })
                        }}
                      >
                        Sil
                      </Button>
                    </div>
                  );
                }
              },
            ]


            const onDelete = () => {
              Swal.fire({
                title: "Eğitimi Sil",
                text: "Eğitimi silmek istediğinizden emin misiniz?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Evet",
                cancelButtonText: "Hayır",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
              }).then((result) => {
                if (result.isConfirmed) {
                  updateEducation({
                    databaseId: AppInfo.Database,
                    collectionId: Collections.Education,
                    documentId: id,
                    data: {
                      is_deleted: true,
                      is_active: false
                    }
                  }, () => {
                    Toast.fire({
                      icon: "success",
                      title: "Eğitim başarıyla silindi!"
                    });
                    deleteCache();
                    navigateToList();
                  })
                }
              })
            }

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
              setForm(education);
              setEducationCompetencyRelation(educationCompetencyRelationList.map((relation) => relation.competency_id))
              setIsActive(education.is_active);
              setSelectedCompetencyId(educationCompetencyRelationList.map((relation) => relation.competency_id))
              const append = []
              educationCompetencyStatusList.filter((item) => item.education_id === id).map((item) => {
                append.push(removeDollarProperties(item))
              })
              setRows(append)
            }, [])

            const [addEducationToUpdateCompetencyStatusParams, setAddEducationToUpdateCompetencyStatusParams] = useState(educationToUpdateCompetencyStatusParams)

            const handleChangeEducationToUpdateCompetencyStatusParams = (e: React.ChangeEvent<HTMLInputElement>) => {
              const { name, value } = e.target
              setSelectedRow({ ...selectedRow, [name]: value })
            }

            // const handleAddEducationToUpdateCompetencyStatusParams = () => {
            //   const { lower_bound, upper_bound } = addEducationToUpdateCompetencyStatusParams;

            //   // string değerleri sayıya dönüştür
            //   const lower = parseFloat(lower_bound);
            //   const upper = parseFloat(upper_bound);

            //   if (isNaN(lower) || isNaN(upper)) {
            //     alert("Lütfen geçerli sayısal değerler girin.");
            //     return;
            //   }

            //   if (lower >= upper) {
            //     alert("Alt aralık üst aralıktan küçük olmalıdır.");
            //     return;
            //   }

            //   // Mevcut aralıklarla çakışma kontrolü
            //   const isOverlap = rows.some(row => {
            //     const rowLower = parseFloat(row.lower_bound);
            //     const rowUpper = parseFloat(row.upper_bound);

            //     return (lower >= rowLower && lower <= rowUpper) || (upper >= rowLower && upper <= rowUpper);
            //   });

            //   if (isOverlap) {
            //     alert("Girilen aralık, mevcut aralıklarla çakışıyor.");
            //     return;
            //   }

            //   // Yeni aralığı ekleme işlemi
            //   setRows(prevRows => [
            //     ...prevRows,
            //     {
            //       id: prevRows.length + 1,
            //       lower_bound: lower_bound,
            //       upper_bound: upper_bound,
            //       competency_level: addEducationToUpdateCompetencyStatusParams.competency_level
            //     }
            //   ]);

            //   // Formu temizle
            //   setAddEducationToUpdateCompetencyStatusParams({
            //     id: 1,
            //     lower_bound: '',
            //     upper_bound: '',
            //     competency_level: ''
            //   });
            // };

            const handleUpdateEducationCompetencyStatusInfo = () => {
              const { lower_bound, upper_bound, competency_level } = selectedRow;

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
              // const isOverlap = rows.some(row => {
              //   const rowLower = parseFloat(row.lower_bound);
              //   const rowUpper = parseFloat(row.upper_bound);

              //   return (lower >= rowLower && lower <= rowUpper) || (upper >= rowLower && upper <= rowUpper);
              // });

              // if (isOverlap) {
              //   alert("Girilen aralık, mevcut aralıklarla çakışıyor.");
              //   return;
              // }

              // Yeni aralığı ekleme işlemi
              const updatedRows = rows.map(row => {
                if (row.id === selectedRow.id) {
                  return {
                    ...row,
                    lower_bound: lower_bound,
                    upper_bound: upper_bound,
                    competency_level: competency_level
                  };
                }

                return row;
              });

              setRows(updatedRows);
              setEditMode(false);




            }


            const handleRowSelectionModelChange = (newSelectionModel: any) => {
              if (educationToUpdateCompetencyStatus && newSelectionModel.length > 1) {
                const selectionSet = new Set(newSelectionModel);
                const result = newSelectionModel.filter((item) => !selectionSet.has(item));
                setEducationCompetencyRelation(result);
                setSelectedCompetencyId(result);
              } else {
                setEducationCompetencyRelation(newSelectionModel);
                setSelectedCompetencyId(newSelectionModel);
              }
            };

            return (
              ReactView(
                <Form
                  title="Eğitimi Düzenle"
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
                          onRowSelectionModelChange={handleRowSelectionModelChange}
                          rowSelectionModel={educationCompetencyRelation}
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
                          {editMode ?
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
                                value={selectedRow?.lower_bound || ""}
                                onChange={handleChangeEducationToUpdateCompetencyStatusParams}
                              />
                              <TextField
                                size="small"
                                fullWidth
                                name="upper_bound"
                                inputProps={{ maxLength: 50 }}
                                label="Üst Aralık"
                                value={selectedRow?.upper_bound || ""}
                                onChange={handleChangeEducationToUpdateCompetencyStatusParams}
                              />
                              <FormControl fullWidth size="small">
                                <InputLabel id="competency_level">İlişkili Yetkinlik Seviyesi</InputLabel>
                                <Select
                                  labelId="competency_level"
                                  id="competency_level"
                                  value={selectedRow?.competency_level || ""}
                                  label="İlişkili Yetkinlik Seviyesi"
                                  onChange={handleChange}
                                  size="small"
                                >
                                  {
                                    levels.filter((x) => x.grade_id === groups.find((x) => x.competency_group_id === competencyList.find((x) => x.competency_id === selectedCompetencyId[0])?.competency_group_id)?.competency_grade_id).map((level) => (
                                      <MenuItem key={level.grade_id} value={level.grade_level_name}>{level.grade_level_name}</MenuItem>
                                    ))
                                  }
                                </Select>
                              </FormControl>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={handleUpdateEducationCompetencyStatusInfo}
                              >
                                Kaydet
                              </Button>
                            </div>
                            : null
                          }
                          <StyledDataGrid
                            rows={rows.sort((a, b) => a.lower_bound - b.lower_bound)}
                            columns={educationToUpdateCompetencyStatusColums}
                            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                            isCellEditable={() => false}
                            disableRowSelectionOnClick
                            rowHeight={30}
                            columnHeaderHeight={30}
                          />
                        </div>
                      }
                      <FormControlLabel
                        sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
                        onChange={(e: any) => setForm({ ...form, is_active: e.target.checked })}
                        control={<Switch color="primary" checked={form.is_active} />}
                        label="Aktif mi?"
                        labelPlacement="start"
                      />
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
                        {!isActive &&
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={onDelete}
                          >
                            Sil
                          </Button>
                        }
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