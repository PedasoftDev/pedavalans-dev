import { Query, useCreateDocument, useListDocuments, useUpdateDocument } from "@realmocean/sdk"
import AppInfo from "../../../AppInfo"
import Collections from "../../core/Collections"
import IEducationCompetencyRelation from "../../../client/interfaces/IEducationCompetencyRelation"

namespace EducationCompetencyRelation {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.EducationCompetencyRelation)
        return { createEducationCompetencyRelation: createDocument, error, isError, isLoading, isSuccess }
    }
    export const GetList = (tenant_id: string): { educationCompetencyRelationList: IEducationCompetencyRelation.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.EducationCompetencyRelation, 
            [Query.equal("tenant_id", tenant_id), Query.equal("is_active", true), Query.equal("is_deleted", false)])
        return { educationCompetencyRelationList: documents as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return { updateEducationCompetencyRelation: updateDocument, error, isError, isLoading, isSuccess }
    }

    export const ListByEducation = (education_id: string): { educationCompetencyRelationList: IEducationCompetencyRelation.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.EducationCompetencyRelation, 
            [Query.equal("education_id", education_id), Query.equal("is_active", true), Query.equal("is_deleted", false)])
        return { educationCompetencyRelationList: documents as any, isLoading }
    }
}

export default EducationCompetencyRelation;