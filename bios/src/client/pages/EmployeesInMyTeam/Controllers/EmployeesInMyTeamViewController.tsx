import { GridColDef } from "@mui/x-data-grid";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import { cLeading, cTop, HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, useNavigate, useState, VStack } from "@tuval/forms";
import React, { useEffect } from "react";
import { Resources } from "../../../assets/Resources";
import employeeListExport from "../../../assets/Functions/employeeListExport";
import { Views } from "../../../components/Views";
import { Button, TextField, Tooltip } from "@mui/material";
import { SiMicrosoftexcel } from "react-icons/si";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridContainer } from "../../Organization/Views/Views";
import OrganizationStructureEmployee from "../../../../server/hooks/organizationStructureEmployee/main";
import OrganizationStructureDepartment from "../../../../server/hooks/organizationStructureDepartment/main";
import OrganizationStructurePosition from "../../../../server/hooks/organizationStructrePosition/main";
import OrganizationStructureLine from "../../../../server/hooks/organizationStructureLine/main";
import OrganizationStructureTitle from "../../../../server/hooks/organizationStructureTitle/main";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";



export interface IEmployeeImportFromExcel {
  sicil_no: string;
  adi: string;
  soyadi: string;
  dogum_tarihi: string;
  telefon_no: string;
  cinsiyet: string;
  egitim_durumu: string;
  ise_baslama_tarihi: string;
  amir_sicil_no: string;
  departman_kodu: string;
  departman_adi: string;
  departmana_baslama_tarihi: string;
  unvan_kodu: string;
  unvan_tanimi: string;
  pozisyon_kodu: string;
  pozisyon_tanimi: string;
  pozisyona_baslama_tarihi: string;
  hat_kodu: string | null;
  hat_adi: string | null;
}

export class EmployeesInMyTeamViewController extends UIController {


  public LoadView(): UIView {

    const { me, isLoading } = useGetMe("console");
    const { employees, isLoadingEmployees, totalEmployees } = OrganizationStructureEmployee.GetEmployeesInMyTeam(me?.$id);

    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)
    const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization)
    const { titles, isLoadingTitles } = OrganizationStructureTitle.GetList(me?.prefs?.organization)


    return (
      isLoading || isLoadingEmployees || isLoadingDepartments || isLoadingPositions || isLoadingLines || isLoadingTitles ? VStack(Spinner()) :
        UIViewBuilder(() => {
          const navigate = useNavigate();

          const [filterKey, setFilterKey] = useState("");
          const [lineRelationState, setLineRelationState] = useState<boolean>(false);

          useEffect(() => {
            Services.Databases.listDocuments(
              AppInfo.Name,
              AppInfo.Database,
              Collections.Parameter,
              [
                Query.equal("name", "line_based_competency_relationship"),
                Query.limit(10000),
              ]
            ).then((res) => {
              setLineRelationState(res.documents[0]?.is_active)
            })
          }, [])


          const columns: GridColDef[] = [
            {
              field: 'id',
              headerName: 'Sicil Numarası',
              width: 200,
              flex: 1
            },
            {
              field: 'first_name',
              headerName: 'İsim',
              width: 200,
              flex: 1
            },
            {
              field: 'last_name',
              headerName: 'Soyisim',
              width: 200,
              flex: 1
            },
            {
              field: 'title_id',
              headerName: 'Ünvan',
              width: 200,
              flex: 1,
              valueGetter: (params: any) => {
                const title = titles.find((title: any) => title.id === params.value);
                if (title) {
                  return title.name;
                } else {
                  return "";
                }
              }
            },
            {
              field: 'position_id',
              headerName: 'Pozisyon',
              width: 200,
              flex: 1,
              valueGetter: (params: any) => {
                const position = positions.find((position: any) => position.id === params.value);
                if (position) {
                  return position.name;
                } else {
                  return "";
                }
              }
            },
            {
              field: 'line_id',
              headerName: 'Hat',
              width: 200,
              flex: 1,
              valueGetter: (params: any) => {
                const line = lines.find((line: any) => line.id === params.value);
                if (line) {
                  return line.name;
                } else {
                  return "";
                }
              }
            },
            {
              field: 'department_id',
              headerName: 'Departman',
              width: 200,
              flex: 1,
              valueGetter: (params: any) => {
                const department = departments.find((department: any) => department.id === params.value);
                if (department) {
                  return department.name;
                } else {
                  return "";
                }
              }
            },
            {
              field: '$createdAt',
              headerName: 'Oluşturulma Tarihi',
              width: 200,
              flex: 1,
              valueGetter: (params: any) => {
                return Resources.Functions.formatDate(params.value);
              }
            },
            {
              field: 'actions',
              headerName: 'İşlemler',
              width: 100,
              renderCell: (params: any) => (
                <Button variant='text' onClick={() => {
                  navigate("/app/employees-in-my-team/update/" + params.row.$id);
                }}>Düzenle</Button>
              )
            }
          ];

          const filteredEmployees = employees.filter((employee) =>
            employee.first_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1 ||
            employee.last_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1
          )


          const employeeExport = () => {
            employeeListExport(localStorage.getItem(Resources.ParameterLocalStr.line_based_competency_relationship) == "true" ? true : false, employees, departments, titles, positions, lines)
          }

          return (
            VStack({ alignment: cTop })(
              HStack({ alignment: cLeading })(
                Views.Title("Ekibimdeki Çalışanlar").paddingTop("20px")
              ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
              VStack({ alignment: cTop })(
                ReactView(
                  <div style={{ width: "100%", height: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", padding: "8px 0", gap: "5px" }
                    }>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <TextField size='small' label='Personel Arayın' variant='outlined' fullWidth onChange={(e) => setFilterKey(e.target.value)} />
                        <Tooltip title={`Çalışan Listesini İndir`}>
                          <Button
                            variant='contained'
                            color='success'
                            onClick={employeeExport}
                            size='small'><SiMicrosoftexcel size={20} />
                          </Button>
                        </Tooltip>
                      </div>
                      <GridContainer>
                        <StyledDataGrid rows={filteredEmployees} columns={columns} columnVisibilityModel={{
                          line_id: lineRelationState ? true : false,
                        }}
                        />
                      </GridContainer>
                    </div>
                  </div>

                )
              ).paddingTop("10px")
            ).padding("0 10px 0 20px")
          )
        })

    )
  }
}