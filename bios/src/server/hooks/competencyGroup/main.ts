import ICompetencyGroup from '../../../client/interfaces/ICompetencyGroup';
import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';

namespace CompetencyGroup {
    export const CreateCompetencyGroup = () => {
        const { createDocument, isLoading, isSuccess, isError, error } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency_group")
        return { createDocument, isLoading, isSuccess, isError, error }
    }

    export const GetCompetencyGroup = (id: string): { group: ICompetencyGroup.IGetCompetencyGroup, isLoading: boolean } => {
        const { document, isLoading, } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: "competency_group", documentId: id })
        return {
            group: document,
            isLoading
        }
    }

    export const GetActiveCompetencyGroups = (): { activeGroups: ICompetencyGroup.IGetCompetencyGroup[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_group", [Query.equal("is_deleted_group", false), Query.equal("is_active_group", true)])
        return {
            activeGroups: documents as any,
            isLoading
        }
    }

    export const GetPassiveCompetencyGroups = (): { passiveGroups: ICompetencyGroup.IGetCompetencyGroup[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_group", [Query.equal("is_deleted_group", false), Query.equal("is_active_group", false)])
        return {
            passiveGroups: documents as any,
            isLoading
        }
    }

    export const GetList = (tenant_id: string): { groups: ICompetencyGroup.IGetCompetencyGroup[], isLoadingGroups: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_group", [Query.equal("is_deleted_group", false), Query.equal("tenant_id", tenant_id)])
        return {
            groups: documents as any,
            isLoadingGroups: isLoading
        }
    }

    export const UpdateCompetencyGroup = () => {
        const { updateDocument, isLoading, isSuccess, isError, error } = useUpdateDocument(AppInfo.Name)
        return { updateDocument, isLoading, isSuccess, isError, error }
    }
}

export default CompetencyGroup;