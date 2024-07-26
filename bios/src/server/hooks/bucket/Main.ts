import { Query, useCreateBucket, useCreateDocument, useGetBucket, useGetDocument, useListDocuments, useUpdateDocument } from '@realmocean/sdk'


namespace Bucket {
    export const Create = (projectId,bucketId,name) => {
        const {createBucket } = useCreateBucket(projectId, bucketId, name)
        return {
            createBucketPage : createBucket
        }
    }

    export const GetBucket = (projectId,bucketId) => {
        const {bucket,isLoading } = useGetBucket(projectId, bucketId)
        return {
            getBucketPage : bucket,
            isLoadingBucket : isLoading
        }
    }

    


}

export default Bucket

