import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IMonitoring from '../../../client/interfaces/IMonitoring';
namespace Monitoring {
    export const GetMonitoring = (tenant_id: string): { monitoring: IMonitoring.IMonitoring[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "monitoring", [Query.equal("tenant_id", tenant_id)])
        return {
            monitoring: documents as any,
            isLoading
        }
    }
}

export default Monitoring;