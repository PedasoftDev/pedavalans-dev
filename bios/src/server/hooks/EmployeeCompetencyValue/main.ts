import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';

namespace EmployeeCompetencyValue {

    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, "employee_competency_value");
        return { createEmployeeCompetencyValue: createDocument, errorCreateEmployeeCompetencyValue: error, isErrorCreateEmployeeCompetencyValue: isError, isLoadingCreateEmployeeCompetencyValue: isLoading, isSuccessCreateEmployeeCompetencyValue: isSuccess };
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name);
        return { updateEmployeeCompetencyValue: updateDocument, errorUpdateEmployeeCompetencyValue: error, isErrorUpdateEmployeeCompetencyValue: isError, isLoadingUpdateEmployeeCompetencyValue: isLoading, isSuccessUpdateEmployeeCompetencyValue: isSuccess };
    }
    export const List = (): {
        listEmployeeCompetencyValue: IEmployeeCompetencyValue.IEmployeeCompetencyValue[],
        isLoadingListEmployeeCompetencyValue: boolean
    } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "employee_competency_value", [Query.limit(100000)]);
        return { listEmployeeCompetencyValue: documents as any, isLoadingListEmployeeCompetencyValue: isLoading };
    }
}

export default EmployeeCompetencyValue;