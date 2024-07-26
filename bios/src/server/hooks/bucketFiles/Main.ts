import { Query, useCreateBucket, useCreateDocument, useCreateFile, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'


namespace BucketFiles {
   export const Create = (projectId,bucketId,fileId?,file?) => {
        const {createFile} = useCreateFile(projectId, bucketId, fileId,file)
            return {
                createFilePage : createFile
            }
   }


}

export default BucketFiles

