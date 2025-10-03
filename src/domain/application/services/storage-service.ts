import type { ImageFile } from '@core/types/image-file.ts'

export interface UploadResponse {
  imageId: string
  imageUrl: string
}

export interface StorageService {
  upload(imageFile: ImageFile): Promise<UploadResponse>
  delete(imageId: string): Promise<void>
}
