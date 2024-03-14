import { Query, useCreateDocument, useListDocuments } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo'
import Collections from '../../core/Collections'
import IMachine from '../../../client/interfaces/IMachine'

namespace Machine {
    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.Machine)
        return { createMachine: createDocument }
    }
    export const GetList = (tenant_id: string): { machineList: IMachine.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.Machine, [Query.limit(10000), Query.equal('tenant_id', tenant_id)])
        return { machineList: documents as any, isLoading }
    }
}

export default Machine
