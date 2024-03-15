import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo'
import Collections from '../../core/Collections'
import IMachine from '../../../client/interfaces/IMachine'

namespace Machine {

    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.Machine)
        return { createMachine: createDocument }
    }

    export const GetList = (tenant_id: string): { machineList: IMachine.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(
            AppInfo.Name,
            AppInfo.Database,
            Collections.Machine,
            [
                Query.limit(10000),
                Query.equal('tenant_id', tenant_id),
                Query.equal('is_deleted', false)
            ])
        return { machineList: documents as any, isLoading }
    }

    export const Get = (id: string): { machine: IMachine.IBase, isLoading: boolean } => {
        const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.Machine, documentId: id })
        return { machine: document as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return { updateMachine: updateDocument }
    }
}

export default Machine
