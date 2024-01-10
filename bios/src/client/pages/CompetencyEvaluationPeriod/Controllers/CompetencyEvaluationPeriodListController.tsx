import { cLeading, cTop, cTopLeading, ForEach, HStack, ReactView, ScrollView, Spinner, UIController, UIViewBuilder, useNavigate, VStack } from "@tuval/forms";
import React, { useCallback, useEffect, useState } from "react";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Views } from "../../../components/Views";
import ICompetencyEvaluationPeriod from "../../../interfaces/ICompetencyEvaluationPeriod";

export class CompetencyEvaluationListController extends UIController {

    public LoadView() {

        const navigotor = useNavigate();

        const { periods, isLoading } = CompetencyEvaluationPeriod.GetCompetencyEvaluationPeriods();

        const [filteredRows, setFilteredRows] = useState<ICompetencyEvaluationPeriod.ICompetencyEvaluationPeriod[]>([]);

        const [isDefault, setIsDefault] = useState<"true" | "false">("true");

        const [searchTimer, setSearchTimer] = useState(null);

        return (
            isLoading ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;

                        if (searchTimer) clearTimeout(searchTimer);

                        const newTimer = setTimeout(() => {
                            const filteredRows = periods.filter(x => x.evaluation_period_name.toLowerCase().indexOf(value.toLowerCase()) > -1);
                            setFilteredRows(filteredRows);
                        }, 1000);

                        setSearchTimer(newTimer);

                    }, [isDefault]);

                    useEffect(() => {
                        return () => {
                            if (searchTimer) clearTimeout(searchTimer);
                        };
                    }, [searchTimer]);

                    useEffect(() => {
                        setFilteredRows(periods);
                    }, [])


                    return (
                        isLoading ? VStack(Spinner()) :
                            VStack({ alignment: cTopLeading })(
                                HStack({ alignment: cLeading })(
                                    VStack({ alignment: cLeading })(
                                        VStack({ alignment: cTopLeading })(
                                            HStack({ alignment: cLeading })(
                                                Views.Title("Yetkinlik Değerlendirme Dönemi")
                                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                            HStack({ spacing: 10 })(
                                                VStack(
                                                    ReactView(
                                                        <TextField label="Dönemleri Arayın" onChange={handleSearch} fullWidth size="small" />
                                                    )
                                                ).width("80%"),
                                                VStack(
                                                    ReactView(
                                                        <Tooltip title={isDefault == "true" ? "Diğer Dönemler" : "Varsayılan Değerlendirme Dönemi"}>
                                                            <IconButton onClick={() => setIsDefault(isDefault == "true" ? "false" : "true")}>
                                                                <FilterAltOutlinedIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )
                                                ).width(),
                                                VStack(
                                                    ReactView(
                                                        <Button size="small" fullWidth variant="outlined" onClick={() => navigotor("/app/competency-evaluation-period/create")}>Yeni Değerlendirme Dönemi</Button>
                                                    )
                                                ).width("20%")
                                            )
                                        ).height().paddingTop("15px"),
                                        VStack({ alignment: cTop })(
                                            HStack({ alignment: cTopLeading })(
                                                ScrollView({ axes: "cVertical" })(
                                                    HStack({ alignment: cTopLeading })(
                                                        ...ForEach(periods.filter(x => x.is_default_year == isDefault))(item =>
                                                            Views.YearCard(item.evaluation_period_year, item.evaluation_period_name, item.is_default_year,
                                                                [
                                                                    {
                                                                        title: "Düzenle",
                                                                        action: () => navigotor(`/app/competency-evaluation-period/edit/${item.evaluation_period_id}`)
                                                                    }
                                                                ]
                                                            ).margin("0 20px 20px 0")
                                                        )
                                                    ).wrap("wrap")
                                                )
                                            ).padding("5px 0")
                                        ),
                                    ).padding("0 20px")
                                )
                            )
                    )
                })
        )
    }
}