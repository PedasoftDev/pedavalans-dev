import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import ITrainers from '../../../client/interfaces/ITrainers';
namespace Trainers {
  export const GetList = (): { trainersList: ITrainers.IBase[], isLoadingTrainersList: boolean } => {
    const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "trainers", [Query.equal("is_deleted", false)])
    return {
      trainersList: documents as any,
      isLoadingTrainersList: isLoading
    }
  }

  export const Create = () => {
    const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, "trainers")
    return {
      createTrainers: createDocument
    }
  }


  export const Update = () => {
    const { updateDocument } = useUpdateDocument(AppInfo.Name)
    return {
      updateTrainers: updateDocument,
    }
  }

}

export default Trainers;