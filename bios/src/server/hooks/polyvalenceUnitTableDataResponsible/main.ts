import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IPolyvalenceUnitTableDataResponsible from '../../../client/interfaces/IPolyvalenceUnitTableDataResponsible';
import Collections from '../../core/Collections';

namespace PolyvalenceUnitTableDataResponsible {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataResponsible)
        return {
            createPolyvalenceUnitTableDataResponsible: createDocument,
            errorPolyvalenceUnitTableDataResponsible: error,
            isErrorPolyvalenceUnitTableDataResponsible: isError,
            isLoadingPolyvalenceUnitTableDataResponsible: isLoading,
            isSuccessPolyvalenceUnitTableDataResponsible: isSuccess
        }
    }

    export const GetByPolyvalenceUnitId = (polyvalence_table_id: string): { dataResponsible: IPolyvalenceUnitTableDataResponsible.IBase[], isLoadingDataResponsible: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataResponsible, [Query.equal("polyvalence_table_id", polyvalence_table_id), Query.equal("is_deleted", false)])
        return {
            dataResponsible: documents as any,
            isLoadingDataResponsible: isLoading
        }
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return {
            updatePolyvalenceUnitTableDataResponsible: updateDocument
        }
    }

    export const GetListByAccountId = (account_id: string): { dataResponsible: IPolyvalenceUnitTableDataResponsible.IBase[], isLoadingDataResponsible: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataResponsible, [Query.equal("responsible_employee_id", account_id), Query.equal("is_deleted", false)])
        return {
            dataResponsible: documents as any,
            isLoadingDataResponsible: isLoading
        }

    }
}

export default PolyvalenceUnitTableDataResponsible;
