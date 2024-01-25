import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IPolyvalenceUnit from '../../../client/interfaces/IPolyvalenceUnit';
namespace PolyvalenceUnit {
    export const GetList = (tenant_id: string): { polyvalenceUnitList: IPolyvalenceUnit.IPolyvalenceUnit[], isLoadingPolyvalenceUnit: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "polyvalence_unit_table", [Query.equal("tenant_id", tenant_id), Query.equal("is_deleted_table", false)])
        return {
            polyvalenceUnitList: documents as any,
            isLoadingPolyvalenceUnit: isLoading
        }
    }

    export const Create = (): { createPolyvalenceUnit, errorPolyvalenceUnit: { message: string }, isErrorPolyvalenceUnit: boolean, isLoadingPolyvalenceUnit: boolean, isSuccessPolyvalenceUnit: boolean } => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, "polyvalence_unit_table")
        return {
            createPolyvalenceUnit: createDocument,
            errorPolyvalenceUnit: error,
            isErrorPolyvalenceUnit: isError,
            isLoadingPolyvalenceUnit: isLoading,
            isSuccessPolyvalenceUnit: isSuccess
        }
    }
}

export default PolyvalenceUnit;