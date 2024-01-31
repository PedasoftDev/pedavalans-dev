import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, useNavigate } from "@tuval/forms";
import React, { useEffect } from "react";
import { Container, LeftContainer, LeftContainerHeader, RightContainer, RightContainerHeader } from "../Views/View";
import { Views } from "../../../components/Views";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Toast } from "../../../components/Toast";
import { useGetMe } from "@realmocean/sdk";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export class CompetencyTargetDataEntryViewController extends UIController {

    public LoadView(): UIView {
        const navigate = useNavigate();
        const { me, isLoading, error, isError } = useGetMe("console");
        const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetList(me?.prefs?.organization);
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod();


        return (
            isLoading || isLoadingPolyvalenceUnit || isLoadingPeriods ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const [selectedTableId, setSelectedTableId] = React.useState("0");

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
                                                    value={selectedTableId}
                                                    label="Polivalans Tablosu"
                                                    onChange={(e) => setSelectedTableId(e.target.value)}
                                                    size="small"
                                                    required
                                                >
                                                    {polyvalenceUnitList.map((unit) => (
                                                        <MenuItem value={unit.polyvalence_table_id} key={unit.polyvalence_table_id}>{unit.polyvalence_table_name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </LeftContainerHeader>
                                    </LeftContainer>
                                    <RightContainer>
                                        <RightContainerHeader>

                                        </RightContainerHeader>

                                    </RightContainer>
                                </Container>
                            )
                        )
                    )
                })
        )
    }
}