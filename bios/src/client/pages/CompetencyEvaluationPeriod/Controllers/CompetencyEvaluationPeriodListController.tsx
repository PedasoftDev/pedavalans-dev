import { cLeading, cTop, cTopLeading, ForEach, HStack, ReactView, ScrollView, Spinner, Text, UIFormController, UIViewBuilder, useNavigate, VStack } from "@tuval/forms";
import React, { useCallback, useState } from "react";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Views } from "../../../components/Views";
import { useGetMe } from "@realmocean/sdk";

export class CompetencyEvaluationListController extends UIFormController {

    public LoadView() {

        const navigate = useNavigate();

        const { me, isLoading: isLoadingMe } = useGetMe("console");
        const { periods, isLoading } = CompetencyEvaluationPeriod.GetCompetencyEvaluationPeriods(me?.prefs?.organization);


        return (
            isLoadingMe || isLoading ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [isDefault, setIsDefault] = useState("true");
                    const [filter, setFilter] = useState("");

                    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
                        setFilter(e.target.value);
                    }, []);

                    const filteredPeriods = periods ? periods.filter(x => x.evaluation_period_name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : [];

                    return (
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
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/competency-evaluation-period/create")}>Yeni Değerlendirme Dönemi</Button>
                                                )
                                            ).width("20%")
                                        )
                                    ).height().paddingTop("15px"),
                                    VStack({ alignment: cTop })(
                                        HStack({ alignment: cTopLeading })(
                                            ScrollView({ axes: "cVertical" })(
                                                HStack({ alignment: cTopLeading })(
                                                    ...ForEach(filteredPeriods.filter(x => x.is_default_year == isDefault))(item =>
                                                        Views.YearCard(item.evaluation_period_year, item.evaluation_period_name, item.is_default_year,
                                                            {
                                                                title: "Düzenle",
                                                                action: () => navigate(`/app/competency-evaluation-period/edit/${item.evaluation_period_id}`)
                                                            }
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