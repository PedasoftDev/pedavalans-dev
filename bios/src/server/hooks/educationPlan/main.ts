import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import Collections from '../../core/Collections';
import IEducationPlan from '../../../client/interfaces/IEducationPlan';

namespace EducationPlan {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.EducationPlan)
        return { createEducationPlan: createDocument, error, isError, isLoading, isSuccess }
    }
    export const GetList = (): { educationPlanList: IEducationPlan.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.EducationPlan, [Query.limit(10000), Query.equal("is_deleted", false)])
        return { educationPlanList: documents as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return { updateEducationPlan: updateDocument, error, isError, isLoading, isSuccess }
    }

    export const Get = (id: string): { educationPlanList: IEducationPlan.IBase, isLoading: boolean } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.EducationPlan, documentId: id })
        return { educationPlanList: document as any, isLoading }
    }
}

export default EducationPlan;