import { Query, useCreateBucket, useCreateDocument, useGetBucket, useGetDocument, useListBuckets, useListDocuments, useUpdateDocument } from '@realmocean/sdk'


namespace Bucket {
    export const Create = (projectId,bucketId,name) => {
        const {createBucket } = useCreateBucket(projectId)
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

    export const GetBucketList = (projectId) => {
        const {isLoading,buckets} = useListBuckets(projectId)
        return {
            getBucketListPage : buckets,
            isLoadingBucketList : isLoading
        }
    }    


}

export default Bucket

