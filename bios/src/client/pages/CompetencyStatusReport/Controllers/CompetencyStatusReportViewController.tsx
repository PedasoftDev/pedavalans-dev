import { Spinner, Text, UIController, UIView, UIViewBuilder, VStack } from "@tuval/forms";
import OrganizationStructureEmployee from "../../../../server/hooks/organizationStructureEmployee/main";
import { useGetMe } from "@realmocean/sdk";
import OrganizationStructureDepartment from "../../../../server/hooks/organizationStructureDepartment/main";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";


export class CompetencyStatusReportViewController extends UIController {

    public LoadView(): UIView {
        const { me, isLoading } = useGetMe("console");
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
        const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        const { periods, isLoading: isLoadingPeriod } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetList(me?.prefs?.organization);

        return (
            isLoading || isLoadingEmployees || isLoadingDepartments || isLoadingPeriod || isLoadingPolyvalenceUnit ?
                VStack(Spinner()) :
                UIViewBuilder(() => {
                    return (
                        VStack(
                            Text(JSON.stringify(employees)),
                            Text(JSON.stringify(departments)),
                            Text(JSON.stringify(periods)),
                            Text(JSON.stringify(polyvalenceUnitList)
                            )
                        )
                    )
                })
        )
    }
}