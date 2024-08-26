import { Query, useCreateDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';

namespace CompetencyWorkplace {
    export const CreateWorkPlace = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency_work_place")
        return {
            CreateWorkPlace: createDocument
        }
    }

    export const GetList = (tenant_id: string): { competencyWorkplaceList, isLoadingCompetencyWorkplacetList: boolean} => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_work_place", [Query.equal("tenant_id", tenant_id), Query.equal("is_deleted", false), Query.limit(10000)])
        return {
            competencyWorkplaceList: documents as any,
            isLoadingCompetencyWorkplacetList: isLoading,
        }
    }


    export const Update = () => {
        const { updateDocument,} = useUpdateDocument(AppInfo.Name)
        return { updateDocument }
    }
}

export default CompetencyWorkplace;