import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IPolyvalenceUnitTableDataViewer from '../../../client/interfaces/IPolyvalenceUnitTableDataViewer';
import Collections from '../../core/Collections';

namespace PolyvalenceUnitTableDataViewer {
    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataViewer)
        return {
            createPolyvalenceUnitTableDataViewer: createDocument
        }
    }

    export const GetByPolyvalenceUnitId = (polyvalence_table_id: string): { dataViewer: IPolyvalenceUnitTableDataViewer.IBase[], isLoadingDataViewer: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataViewer, [Query.limit(10000), Query.equal("polyvalence_table_id", polyvalence_table_id), Query.equal("is_deleted", false)])
        return {
            dataViewer: documents as any,
            isLoadingDataViewer: isLoading
        }
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return {
            updatePolyvalenceUnitTableDataViewer: updateDocument
        }

    }

    export const GetListByAccountId = (account_id: string): { dataViewer: IPolyvalenceUnitTableDataViewer.IBase[], isLoadingDataViewer: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataViewer, [Query.limit(10000), Query.equal("viewer_employee_id", account_id), Query.equal("is_deleted", false)])
        return {
            dataViewer: documents as any,
            isLoadingDataViewer: isLoading
        }

    }
}

export default PolyvalenceUnitTableDataViewer;
