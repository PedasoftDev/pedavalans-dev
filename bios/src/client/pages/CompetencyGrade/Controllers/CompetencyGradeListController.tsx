import {
    cLeading,
    cTop,
    cTopLeading,
    ForEach,
    HStack,
    ReactView,
    ScrollView,
    Spinner,
    UIController,
    useNavigate,
    VStack,
} from '@tuval/forms';
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Views } from '../../../components/Views';
import CompetencyGrade from '../../../../server/hooks/competencyGrade/main';
import ICompetencyGrade from '../../../interfaces/CompetencyGrade';

export class CompetencyGradeListController extends UIController {

    public LoadView() {

        const navigate = useNavigate();

        const { grades, isLoading } = CompetencyGrade.GetCompetencyGrades();
        const [showingCompetencyGrade, setShowingCompetencyGrade] = useState<ICompetencyGrade.ICompetencyGrade[]>([]);

        const search = (filter_text: string) => {
            setShowingCompetencyGrade(grades.filter((item) => item["competency_grade_name"].toLowerCase().indexOf(filter_text.toLowerCase()) > -1))
        }

        useEffect(() => {
            setShowingCompetencyGrade(grades);
        }, [grades])

        return (
            isLoading ? VStack(Spinner()) :
                VStack({ alignment: cTopLeading })(
                    HStack({ alignment: cLeading })(
                        VStack({ alignment: cLeading })(

                            VStack({ alignment: cTopLeading })(
                                HStack({ alignment: cLeading })(
                                    Views.Title("Yetkinlik Düzeyleri Listesi")
                                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                HStack({ spacing: 10 })(
                                    VStack(
                                        ReactView(
                                            <TextField label="Düzeyleri Arayın" onChange={(e) => search(e.target.value)} fullWidth size="small" />
                                        )
                                    ).width("80%"),
                                    VStack(
                                        ReactView(
                                            <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/competency-grade/create")}>Yeni Kayıt</Button>
                                        )
                                    ).width("20%")
                                ),
                            ).height().paddingTop("15px"),

                            VStack({ alignment: cTop })(
                                showingCompetencyGrade == null ? VStack(Spinner()) :
                                    HStack({ alignment: cTopLeading })(
                                        ScrollView({ axes: "cVertical" })(
                                            VStack({ alignment: cTop })(
                                                ...ForEach(showingCompetencyGrade)(grade =>
                                                    Views.GradeCard(grade.competency_grade_name, [
                                                        {
                                                            title: "Düzenle",
                                                            action: () => navigate(`/app/competency-grade/edit/${grade.$id}`)
                                                        },
                                                        {
                                                            title: "Düzey Skalası",
                                                            action: () => navigate(`/app/competency-grade/level/${grade.$id}`)
                                                        }
                                                    ])
                                                )
                                            )
                                        )
                                    )
                            ),
                        ).padding("0 20px")
                    )
                )
        )
    }
}