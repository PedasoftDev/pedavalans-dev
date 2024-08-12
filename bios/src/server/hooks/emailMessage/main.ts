import { Query, useCreateDocument, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo'
import Collections from '../../core/Collections'
import IEmailMessage from '../../../client/interfaces/IEmailMessage'

namespace EmailMessage {
  export const Create = () => {
    const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.EmailMessage)
    return {
      createEmailRequest: createDocument
    }
  }

}

export default EmailMessage 