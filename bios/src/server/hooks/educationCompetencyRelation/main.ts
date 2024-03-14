import { Query, useCreateDocument, useListDocuments } from "@realmocean/sdk"
import AppInfo from "../../../AppInfo"
import Collections from "../../core/Collections"
import IEducationCompetencyRelation from "../../../client/interfaces/IEducationCompetencyRelation"

namespace EducationCompetencyRelation {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.EducationCompetencyRelation)
        return { createEducationCompetencyRelation: createDocument, error, isError, isLoading, isSuccess }
    }
    export const GetList = (tenant_id: string): { educationCompetencyRelationList: IEducationCompetencyRelation.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.EducationCompetencyRelation, [Query.equal("tenant_id", tenant_id)])
        return { educationCompetencyRelationList: documents as any, isLoading }
    }
}

export default EducationCompetencyRelation;