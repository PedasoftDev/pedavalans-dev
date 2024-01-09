import ICompetencyGroup from './../../../client/interfaces/CompetencyGroup';
import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';

namespace CompetencyGroup {
    export const CreateCompetencyGroup = () => {
        const { createDocument, isLoading, isSuccess, isError, error } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency_group")
        return { createDocument, isLoading, isSuccess, isError, error }
    }
}

export default CompetencyGroup;