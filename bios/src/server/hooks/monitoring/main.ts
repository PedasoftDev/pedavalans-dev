import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IMonitoring from '../../../client/interfaces/IMonitoring';
namespace Monitoring {
    export const GetMonitoring = (tenant_id: string): { monitoring: IMonitoring.IMonitoring[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "monitoring", [Query.limit(10000), Query.equal("tenant_id", tenant_id)])
        return {
            monitoring: documents as any,
            isLoading
        }
    }
}

export default Monitoring;