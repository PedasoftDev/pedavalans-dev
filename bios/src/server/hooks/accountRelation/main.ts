import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from "@realmocean/sdk";
import AppInfo from "../../../AppInfo";
import IAccountRelation from "../../../client/interfaces/IAccountRelation";

namespace AccountRelation {

    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, "account_relation")
        return {
            createAccountRelation: createDocument
        }
    }

    export const GetByAccountId = (id: string): {
        accountRelations: IAccountRelation.IBase[],
        isLoadingResult: boolean
    } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "account_relation", [Query.equal("account_id", id)])
        return {
            accountRelations: documents as any,
            isLoadingResult: isLoading
        }
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return {
            updateAccountRelation: updateDocument
        }
    }

    export const GetList = (tenant_id: string): {
        accountRelations: IAccountRelation.IBase[],
        isLoadingResult: boolean
    } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "account_relation", [Query.equal("tenant_id", tenant_id), Query.equal("is_deleted", false), Query.limit(10000)])
        return {
            accountRelations: documents as any,
            isLoadingResult: isLoading
        }
    }

}

export default AccountRelation;