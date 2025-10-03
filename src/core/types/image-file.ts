type ImageMimetype =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/webp'
  | 'image/svg'

export interface ImageFile {
  buffer: Buffer
  name: string
  mimetype: ImageMimetype
  size: number
}
