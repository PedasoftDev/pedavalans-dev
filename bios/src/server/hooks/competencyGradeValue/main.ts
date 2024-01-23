import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';

namespace CompetencyGradeValue {
    export const CreateCompetencyGradeValue = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency_grade_value")
        return {
            createCompetencyGradeValue: createDocument,
            errorCreateCompetencyGradeValue: error,
            isErrorCreateCompetencyGradeValue: isError,
            isLoadingCreateCompetencyGradeValue: isLoading,
            isSuccessCreateCompetencyGradeValue: isSuccess
        }
    }
}

export default CompetencyGradeValue;