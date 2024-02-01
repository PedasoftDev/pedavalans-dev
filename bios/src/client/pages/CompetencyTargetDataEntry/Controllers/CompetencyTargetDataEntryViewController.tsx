import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Container, LeftContainer, LeftContainerContent, LeftContainerContentItem, LeftContainerHeader, RightContainer, RightContainerHeader } from "../Views/View";
import { Views } from "../../../components/Views";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Toast } from "../../../components/Toast";
import { useGetMe } from "@realmocean/sdk";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import IPolyvalenceUnit from "../../../interfaces/IPolyvalenceUnit";
import OrganizationStructureEmployee from "../../../../server/hooks/organizationStructureEmployee/main";
import { IoPersonCircleOutline } from "react-icons/io5";
import getYearPeriods from "../../../assets/Functions/getYearPeriods";
import getHalfYearPeriods from "../../../assets/Functions/getHalfYearPeriods";
import getQuarterYearPeriods from "../../../assets/Functions/getQuarterYearPeriods";
import getMonthPeriods from "../../../assets/Functions/getMonthPeriods";

const resetUnitTable: IPolyvalenceUnit.IPolyvalenceUnit = {
    is_active_table: true,
    polyvalence_department_id: "",
    polyvalence_table_id: "",
    polyvalence_table_name: "",
    is_deleted_table: false,
    polyvalence_department_name: "",
    polyvalence_evaluation_frequency: "",
    realm_id: "",
    tenant_id: ""
}

export class CompetencyTargetDataEntryViewController extends UIController {

    public LoadView(): UIView {
        const navigate = useNavigate();
        const { me, isLoading, error, isError } = useGetMe("console");
        const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetList(me?.prefs?.organization);
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod();
        const { employees, isLoadingEmployees, totalEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);


        return (
            isLoading || isLoadingPolyvalenceUnit || isLoadingPeriods || isLoadingEmployees ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [selectedTable, setSelectedTable] = useState<IPolyvalenceUnit.IPolyvalenceUnit>(resetUnitTable);
                    const [dataYear, setDataYear] = useState<{ name: string }[]>([]);
                    const [selectedPeriod, setSelectedPeriod] = useState<string>("");
                    const [selectedEmployee, setSelectedEmployee] = useState<number>(-1);

                    const onChangeTable = (e: SelectChangeEvent<string>) => {
                        const table = polyvalenceUnitList.find((unit) => unit.polyvalence_table_id === e.target.value);
                        const periodYear = Number(periods[0].evaluation_period_year);
                        setSelectedTable(table)
                        setSelectedPeriod("")
                        if (table.polyvalence_evaluation_frequency == "Yıl") {
                            setDataYear(getYearPeriods(periodYear))
                        }
                        else if (table.polyvalence_evaluation_frequency == "Yarıyıl") {
                            setDataYear(getHalfYearPeriods(periodYear))
                        }
                        else if (table.polyvalence_evaluation_frequency == "Çeyrekyıl") {
                            setDataYear(getQuarterYearPeriods(periodYear))
                        }
                        else if (table.polyvalence_evaluation_frequency == "Ay") {
                            setDataYear(getMonthPeriods(periodYear))
                        }
                    }

                    const selectEmployee = (index: number) => {
                        if (selectedEmployee === index) {
                            setSelectedEmployee(-1);
                        } else {
                            setSelectedEmployee(index);
                        }
                    }




                    useEffect(() => {
                        if (!me) {
                            Toast.fire({
                                icon: "warning",
                                title: "Kişi bilgileri alınamadı."
                            })
                            navigate("/login")
                        }
                        if (!periods[0]) {
                            Toast.fire({
                                icon: "warning",
                                title: "Henüz bir yetkinlik değerlendirme dönemi tanımlanmamış."
                            })
                            navigate("/app/competency-evaluation-period/list")
                        }
                    }, [])

                    return (
                        VStack(
                            HStack({ alignment: cLeading })(
                                Views.Title("Yetkinlik Hedef Değer Girişi").paddingTop("10px")
                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                            ReactView(
                                <Container>
                                    <LeftContainer>
                                        <LeftContainerHeader>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Polivalans Tablosu</InputLabel>
                                                <Select
                                                    name="polyvalence_table_id"
                                                    value={selectedTable?.polyvalence_table_id}
                                                    label="Polivalans Tablosu"
                                                    onChange={onChangeTable}
                                                    size="small"
                                                    required
                                                >
                                                    {polyvalenceUnitList.map((unit) => (
                                                        <MenuItem value={unit.polyvalence_table_id} key={unit.polyvalence_table_id}>{unit.polyvalence_table_name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Değerlendirme Dönemi</InputLabel>
                                                <Select
                                                    name="evaluation_period"
                                                    value={selectedPeriod}
                                                    label="Değerlendirme Dönemi"
                                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                                    size="small"
                                                    required
                                                >
                                                    {dataYear.map((period, i) => (
                                                        <MenuItem value={period.name} key={i}>{period.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </LeftContainerHeader>
                                        {
                                            selectedTable && selectedPeriod &&
                                            <LeftContainerContent>
                                                {
                                                    employees.filter((employee) => employee.department_id === selectedTable.polyvalence_department_id).map((employee, i) =>
                                                        <LeftContainerContentItem key={employee.$id} selected={selectedEmployee === i} onClick={() => selectEmployee(i)}>
                                                            <IoPersonCircleOutline size={25} {...(selectedEmployee === i && { color: "#3BA2EE" })} />
                                                            {employee.first_name} {employee.last_name}
                                                        </LeftContainerContentItem>
                                                    )
                                                }
                                            </LeftContainerContent>
                                        }
                                    </LeftContainer>
                                    <RightContainer>
                                        <RightContainerHeader>

                                        </RightContainerHeader>

                                    </RightContainer>
                                </Container>
                            )
                        ).padding("0 20px")
                    )
                })
        )
    }
}