import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';

namespace EmployeeCompetencyValue {
    export const GetByEmployeeIdEvaluationPeriod = (employeeId: string, competency_evaluation_period: string, tenant_id: string) => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "employee_competency_value",
            [Query.equal("employee_id", employeeId), Query.equal("competency_evaluation_period", competency_evaluation_period), Query.equal("is_deleted_competency_value", false), Query.equal("tenant_id", tenant_id)]);
        return { employeeCompetencyValue: documents, isLoadingEmployeeCompetencyValue: isLoading };
    };
}

export default EmployeeCompetencyValue;