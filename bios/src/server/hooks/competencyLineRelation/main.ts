import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import ICompetencyLineRelation from '../../../client/interfaces/ICompetencyLineRelation';

namespace CompetencyLineRelation {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, "competency_line_relation")
        return { createCompetencyLineRelation: createDocument, error, isError, isLoading, isSuccess }
    }

    export const GetList = () => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_line_relation", [Query.limit(10000), Query.equal("is_deleted", false)])
        return { competencyLineRelationList: documents as any, isLoading }
    }

    export const GetByCompetencyId = (competencyId: string, tenant_id: string): {
        competencyLineRelation: ICompetencyLineRelation.ICompetencyLineRelation[],
        isLoading: boolean
    } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_line_relation", [Query.limit(10000), Query.equal("competency_id", competencyId), Query.equal("tenant_id", tenant_id), Query.equal("is_deleted", false)])
        return { competencyLineRelation: documents as any, isLoading }
    }

    export const GetByLineId = (lineId: string, tenant_id: string): {
        competencyLineRelation: ICompetencyLineRelation.ICompetencyLineRelation[],
        isLoading: boolean
    } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "competency_line_relation", [Query.limit(10000), Query.equal("line_id", lineId), Query.equal("tenant_id", tenant_id), Query.equal("is_deleted", false)])
        return { competencyLineRelation: documents as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return { updateCompetencyLineRelation: updateDocument, error, isError, isLoading, isSuccess }
    }
}

export default CompetencyLineRelation;