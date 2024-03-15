import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import ICompetency from '../../../client/interfaces/ICompetency';

namespace Competency {
    export const Create = () => {
        const { createDocument, isLoading, isSuccess, isError, error } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency")
        return {
            createCompetency: createDocument,
            isLoadingCreateCompetency: isLoading,
            isSuccessCreateCompetency: isSuccess,
            isErrorCreateCompetency: isError,
            errorCreateCompetency: error
        }
    }

    export const GetList = (tenant_id: string): { competencyList: ICompetency.ICompetency[], isLoadingCompetencyList: boolean, totalCompetencyList: Number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency", [Query.equal("tenant_id", tenant_id), Query.equal('is_deleted_competency', false), Query.limit(10000)])
        return {
            competencyList: documents as any,
            isLoadingCompetencyList: isLoading,
            totalCompetencyList: total
        }
    }

    export const Get = (id: string): { competency: ICompetency.ICompetency, isLoadingCompetency: boolean } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: "competency", documentId: id })
        return {
            competency: document as any,
            isLoadingCompetency: isLoading
        }
    }

    export const Update = (): {
        updateCompetency: ({ databaseId, collectionId, documentId, data, permissions }: {
            databaseId: string;
            collectionId: string;
            documentId: string;
            data?: any;
            permissions?: string[];
        }, onSuccess?: (data: any) => void) => void,
        errorUpdateCompetency: { message: string },
        isErrorUpdateCompetency: boolean,
        isLoadingUpdateCompetency: boolean,
        isSuccessUpdateCompetency: boolean
    } => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return { updateCompetency: updateDocument, errorUpdateCompetency: error, isErrorUpdateCompetency: isError, isLoadingUpdateCompetency: isLoading, isSuccessUpdateCompetency: isSuccess }
    }
}

export default Competency;