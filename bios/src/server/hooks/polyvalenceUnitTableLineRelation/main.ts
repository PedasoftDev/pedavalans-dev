import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import IPolyvalenceUnitTableLineRelation from '../../../client/interfaces/IPolyvalenceUnitTableLineRelation';


namespace PolyvalenceUnitTableLineRelation {
    export const Create = () => {
        const { createDocument, error, isError, isLoading, isSuccess } = useCreateDocument(AppInfo.Name, AppInfo.Database, 'polyvalence_unit_table_line_rel')
        return { createPolyvalenceUnitLineRelation: createDocument, error, isError, isLoading, isSuccess }
    }

    export const GetByPolyvalenceUnitId = (polyvalence_unit_id: string, tenant_id: string): { lineRelation: IPolyvalenceUnitTableLineRelation.IPolyvalenceUnitTableLineRelation[], isLoading: boolean, total: number } => {
        const { documents, isLoading, total } = useListDocuments(AppInfo.Name, AppInfo.Database, 'polyvalence_unit_table_line_rel', [Query.equal('polyvalence_table_id', polyvalence_unit_id), Query.equal('tenant_id', tenant_id)])
        return { lineRelation: documents as any, isLoading, total }
    }

    export const Update = () => {
        const { updateDocument, error, isError, isLoading, isSuccess } = useUpdateDocument(AppInfo.Name)
        return { updatePolyvalenceUnitLineRelation: updateDocument, error, isError, isLoading, isSuccess }
    }
}

export default PolyvalenceUnitTableLineRelation;