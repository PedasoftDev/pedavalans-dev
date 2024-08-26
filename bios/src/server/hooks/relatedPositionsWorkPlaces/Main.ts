import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import Collections from '../../core/Collections';
import IRelatedPositonsWorkPlaces from '../../../client/interfaces/IRelatedPositonsWorkPlaces';


namespace RelatedPositionsWorkPlaces {
    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.Related_Position_Workplaces)
        return { createRelatedPositionsWorkPlaces: createDocument }
    }
    export const GetList = (): { relatedPositionsWorkPlacesList: IRelatedPositonsWorkPlaces.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.Related_Position_Workplaces, [Query.limit(10000), Query.equal("is_deleted", false)])
        return { relatedPositionsWorkPlacesList: documents as any, isLoading }
    }

    export const Update = () => {
        const { updateDocument } = useUpdateDocument(AppInfo.Name)
        return { updateRelatedPositonsWorkPlace: updateDocument}
    }

    // export const Get = (id: string): { education: IEducation.IBase, isLoading: boolean } => {
    //     const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.Education, documentId: id })
    //     return { education: document as any, isLoading }
    // }
}

export default RelatedPositionsWorkPlaces;