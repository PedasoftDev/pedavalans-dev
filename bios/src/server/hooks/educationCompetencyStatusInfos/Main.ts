import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from "@realmocean/sdk"
import AppInfo from "../../../AppInfo"
import Collections from "../../core/Collections"
import IEducationCompetencyStatusInfos from "../../../client/interfaces/IEducationCompetencyStatusInfos"

namespace EducationCompetencyStatusInfos {
    export const Create = () => {
        const { createDocument} = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.EducationCompetencyStatusInfos)
        return { createEducationCompetencyStatusInfos: createDocument}
    }
    export const GetList = (tenant_id: string): { educationCompetencyStatusList: IEducationCompetencyStatusInfos.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.EducationCompetencyStatusInfos,
            [Query.limit(10000), Query.equal("tenant_id", tenant_id), Query.equal("is_active", true), Query.equal("is_deleted", false)])
        return { educationCompetencyStatusList: documents as any, isLoading }
    }
   
    export const Update = () => {
        const { updateDocument} = useUpdateDocument(AppInfo.Name)
        return { updateEducationCompetencyStatusInfos: updateDocument}
    }
}

export default EducationCompetencyStatusInfos;