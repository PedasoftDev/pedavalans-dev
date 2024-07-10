import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo';
import ITrainerEducations from '../../../client/interfaces/ITrainerEducations';
import Collections from '../../core/Collections';

namespace TrainerEducations {
  export const GetList = (): { trainerEducationsList: ITrainerEducations.IBase[], isLoadingTrainerEducationsList: boolean } => {
    const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, "trainer_educations", [Query.equal("is_deleted", false), Query.limit(10000)])
    return {
      trainerEducationsList: documents as any,
      isLoadingTrainerEducationsList: isLoading
    }
  }

  export const Create = () => {
    const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, "trainer_educations")
    return {
      createTrainerEducations: createDocument
    }
  }


  export const Update = () => {
    const { updateDocument } = useUpdateDocument(AppInfo.Name)
    return {
      updateTrainerEducations: updateDocument,
    }
  }

  export const ListByTrainer = (trainer_id: string): { trainerEducationsRelationList: ITrainerEducations.IBase[], isLoading: boolean } => {
    const { documents, isLoading } = useListDocuments(AppInfo.Name, AppInfo.Database, Collections.TrainerEducations,
      [Query.limit(10000), Query.equal("trainer_id", trainer_id), Query.equal("is_active", true), Query.equal("is_deleted", false)])
    return { trainerEducationsRelationList: documents as any, isLoading }
  }

}

export default TrainerEducations;