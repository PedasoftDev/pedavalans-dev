import { useCreateAccount, useCreateEmailSession, useGetMe, useGetOrganization } from "@realmocean/sdk";
import AppInfo from "../../../AppInfo";

namespace Accounts {

    export const CreateConsoleAccount = ({ name, email, password }: { name: string, email: string, password: string }) => {
        const { createAccount, isSuccess, isError, error } = useCreateAccount('console');
        createAccount({ name, email, password });
        return { isSuccess, isError, error };
    }

    export const CreateEmailSession = ({ email, password }: { email: string, password: string }) => {
        const { createEmailSession, isSuccess, isError, error } = useCreateEmailSession('console');
        createEmailSession({ email, password });
        return { isSuccess, isError, error };
    }

}

export default Accounts;