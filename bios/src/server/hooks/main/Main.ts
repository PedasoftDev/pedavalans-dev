import { useGetDatabase } from "@realmocean/sdk";

namespace Main {
    export const GetDatabase = () => {
        const { database, isLoading } = useGetDatabase("pedavalans", "pedavalans");
        return { database, isLoading }
    }

    export const SetupRequired = () => {
        const { database, isLoading, isError, error } = useGetDatabase("pedavalans", "pedavalans");
        if (!isLoading && isError) {
            return {
                required: error.code == 404,
                isLoading: false,
            }
        }
        return {
            required: false,
            isLoading: isLoading,
        }
    }

}

export default Main;