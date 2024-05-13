import { Query, useCreateDocument, useListDocuments, useUpdateDocument } from "@realmocean/sdk"
import AppInfo from "../../../AppInfo"
import Collections from "../../core/Collections"
import { IOrganizationStructure } from "../../../client/interfaces/IOrganizationStructure"

namespace PositionVocationalQualificationRelation {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.PositionVocationalQualificationRelation)
        return { createPositionVocationalQualificationRelation: createDocument, error, isError, isLoading, isSuccess }
    }
    export const GetList = (tenant_id: string): { positionVocationalQualificationRelationList: IOrganizationStructure.IPositionVocationalQualificationRelation.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.PositionVocationalQualificationRelation,
            [Query.equal("tenant_id", tenant_id), Query.equal("is_active", true), Query.equal("is_deleted", false)])
        return { positionVocationalQualificationRelationList: documents as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return { updatePositionVocationalQualificationRelation: updateDocument, error, isError, isLoading, isSuccess }
    }

    export const ListByPosition = (position_id: string): { positionVocationalQualificationRelationList: IOrganizationStructure.IPositionVocationalQualificationRelation.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.PositionVocationalQualificationRelation,
            [Query.equal("position_id", position_id), Query.equal("is_active", true), Query.equal("is_deleted", false)])
        return { positionVocationalQualificationRelationList: documents as any, isLoading }
    }
}

export default PositionVocationalQualificationRelation;