import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import Collections from '../../core/Collections';
import IRelatedDepartmentsWorkPlaces from '../../../client/interfaces/IRelatedDepartmentsWorkPlaces';

namespace RelatedDepartmentsWorkPlaces {
    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.Related_Departments_Workplaces)
        return { createRelatedDepartmentsWorkPlaces: createDocument }
    }
    export const GetList = (): { relatedDepartmentsWorkPlacesList: IRelatedDepartmentsWorkPlaces.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.Related_Departments_Workplaces, [Query.limit(10000), Query.equal("is_deleted", false)])
        return { relatedDepartmentsWorkPlacesList: documents as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return { updateRelatedDepartmentsWorkPlace: updateDocument}
    }

    // export const Get = (id: string): { education: IEducation.IBase, isLoading: boolean } => {
    //     const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.Education, documentId: id })
    //     return { education: document as any, isLoading }
    // }
}

export default RelatedDepartmentsWorkPlaces;