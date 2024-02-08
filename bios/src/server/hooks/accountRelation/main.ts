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
            accountRelations: document as any,
            isLoadingResult: isLoading
        }
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return {
            updateAccountRelation: updateDocument
        }
    }

}

export default AccountRelation;