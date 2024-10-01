import { useCreateDocument, useGetDocument, useUpdateDocument } from '@realmocean/sdk'
import AppInfo from '../../../AppInfo'
import Collections from '../../core/Collections'
import IOrganizationIntegration from '../../../client/interfaces/IOrganizationIntegration'

namespace OrganizationIntegration {
  export const documentId = "organization_integration"

  export const Get = () => {
    const { document, isLoading } = useGetDocument({ projectId: AppInfo.Name, databaseId: AppInfo.Database, collectionId: Collections.OrganizationIntegration, documentId: documentId })
    return {
      isLoadingOrganizationIntegration: isLoading,
      mail: document as any as IOrganizationIntegration
    }
  }

  export const Update = () => {
    const { updateDocument } = useUpdateDocument(AppInfo.Name)
    return {
      updateOrganizationIntegration: updateDocument
    }
  }

  export const Create = () => {
    const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.OrganizationIntegration)
    return {
      createOrganizationIntegration: createDocument
    }
  }

}

export default OrganizationIntegration 
