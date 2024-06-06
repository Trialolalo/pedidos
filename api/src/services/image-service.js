const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')

module.exports = class ImageService {
  uploadImage = async images => {
    const result = []

    for (const image of images) {
      const filename = image.originalname.split('.')[0].replaceAll('_', '-')

      const newFilename = await fs.access(path.join(__dirname, `../storage/images/gallery/original/${filename}.webp`)).then(async () => {
        return `${filename}-${new Date().getTime()}.webp`
      }).catch(async () => {
        return `${filename}.webp`
      })

      await sharp(image.buffer)
        .webp({ lossless: true })
        .toFile(path.join(__dirname, `../storage/images/gallery/original/${newFilename}`))

      await sharp(image.buffer)
        .resize(135, 135)
        .webp({ lossless: true })
        .toFile(path.join(__dirname, `../storage/images/gallery/thumbnail/${newFilename}`))

      result.push(newFilename)
    }

    return result
  }

  resizeImages = async (images) => {
    const resizedImages = {}
    for (const image of images) {
      const filename = image.filename.split('.')[0]
      const originalFilename = path.join(__dirname, `../storage/images/gallery/original/${filename}.webp`)

      for (const size in image.imageConfiguration) {
        if (!resizedImages[size]) {
          resizedImages[size] = {}
        }

        resizedImages[size][image.name] = {
          originalFilename: `${filename}.webp`,
          filename: `${filename}-${image.imageConfiguration[size].widthPx}x${image.imageConfiguration[size].heightPx}.webp`,
          title: image.title,
          alt: image.alt,
          widthPx: image.imageConfiguration[size].widthPx,
          heightPx: image.imageConfiguration[size].heightPx
        }
      }

      Object.entries(image.imageConfiguration).forEach(async ([key, value]) => {
        await sharp(originalFilename)
          .resize(parseInt(value.widthPx), parseInt(value.heightPx))
          .webp({ lossless: true })
          .toFile(path.join(__dirname, `../storage/images/resized/${filename}-${value.widthPx}x${value.heightPx}.webp`))
      })
    }

    return resizedImages
  }

  deleteImages = async filename => {
    try {
      await fs.unlink(path.join(__dirname, `../storage/images/gallery/original/${filename}`))
      await fs.unlink(path.join(__dirname, `../storage/images/gallery/thumbnail/${filename}`))

      return 1
    } catch {
      return 0
    }
  }
}
