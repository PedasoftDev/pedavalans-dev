import { Query, useCreateDocument, useListDocuments, useUpdateDocument } from "@realmocean/sdk";
import AppInfo from "../../../AppInfo";
import Collections from "../../core/Collections";

namespace ProxyAccount {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.ProxyAccount);
        return { createProxyAccount: createDocument, error, isError, isLoading, isSuccess };
    }

    export const GetByAccountId = (account_id: string) => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.ProxyAccount,
            [Query.equal("principal_id", account_id), Query.equal("is_active", true), Query.equal("is_deleted", false)]);
        return { accountProxyList: documents as any, isLoading };
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return {
            updateProxyAccount: updateDocument
        }
    }
}

export default ProxyAccount;
