import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo'
import Collections from '../../core/Collections'
import IMailSettings from '../../../client/interfaces/IMailSettings'

namespace MailSettings {
  export const documentId = "mail_settings"

  export const Get = () => {
    const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.MailSettings, documentId: documentId })
    return {
      isLoadingMailSettings: isLoading,
      mail: document as any as IMailSettings
    }
  }

  export const Update = () => {
    const { updateDocument } = useUpdateDocument(AppInfo.Name)
    return {
      updateMailSettings: updateDocument
    }
  }

  export const Create = () => {
    const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.MailSettings)
    return {
      createMailSettings: createDocument
    }
  }

}

export default MailSettings 
