import { apiSlice } from './apiSlice';
import { ApiResponse } from '@/types/common';

interface UploadResponse {
    success: boolean;
    url: string;
    publicId?: string;
    filename?: string;
}

export const uploadApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation<ApiResponse<UploadResponse>, FormData>({
            query: (formData) => ({
                url: '/upload/image',
                method: 'POST',
                body: formData,
            }),
        }),

        uploadDocument: builder.mutation<ApiResponse<UploadResponse>, FormData>({
            query: (formData) => ({
                url: '/upload/document',
                method: 'POST',
                body: formData,
            }),
        }),

        deleteFile: builder.mutation<ApiResponse<void>, string>({
            query: (fileId) => ({
                url: `/upload/${fileId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useUploadImageMutation,
    useUploadDocumentMutation,
    useDeleteFileMutation,
} = uploadApi;
