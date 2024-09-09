import { Query, useCreateBucket, useGetFileDownload,useGetFilePreview,useGetFileView, useCreateFile, useGetFile,useGetDocument, useListDocuments, useUpdateDocument, useDeleteFile } from '@realmocean/sdk'


namespace BucketFiles {
   export const Create = (projectId,bucketId,fileId?,file?) => {
        const {createFile} = useCreateFile(projectId, bucketId, fileId,file)
            return {
                createFilePage : createFile
            }
   }
   export const GetList = (projectId, bucketId, fileId) => {
    const {file, isLoading} = useGetFile(projectId, bucketId, fileId) 
    return {
        getFilePage : file,
        isLoadingFile : isLoading
    }
   }

   export const GetDownload = (projectId, bucketId, fileId) => {
    const {fileDownload,isLoading} = useGetFileDownload(projectId, bucketId, fileId)
    return {
        getFileDownload : fileDownload,
        isLoadingDownloadFile : isLoading
    }
   }

    export const GetPreview = (projectId, bucketId, fileId) => {
     const {filePreview,isLoading} = useGetFilePreview(projectId, bucketId, fileId)
     return {
          getFilePreview : filePreview,
          isLoadingPreviewFile : isLoading
     }
    }

    export const GetView = (projectId, bucketId, fileId) => {
        const {fileView,isLoading} = useGetFileView(projectId, bucketId, fileId)
        return {
            getFileView : fileView,
            isLoadingViewFile : isLoading
        }
    }

    export const DeleteView = (projectId) => {
        const {deleteFile,isLoading} = useDeleteFile(projectId)
        return {
            deleteFile:deleteFile,
            isLoadingDeleteFile:isLoading
        }
    }


}

export default BucketFiles

