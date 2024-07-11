import { createSlice } from '@reduxjs/toolkit'

export const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    imageGallery: null,
    showedImages: [],
    selectedImages: []
  },
  reducers: {
    setImageGallery: (state, action) => {
      state.imageGallery = action.payload
    },
    showImage: (state, action) => {
      state.showedImages.push(action.payload)
    },
    showImages: (state, action) => {
      if (action.payload.xs) {
        state.showedImages = Object.entries(action.payload.xs).map(([key, value]) => ({
          name: key,
          filename: value.originalFilename,
          title: value.title,
          alt: value.alt
        }))
      }
    },
    addImage: (state, action) => {
      if (!state.selectedImages.some(image =>
        image.name === action.payload.name &&
        image.filename === action.payload.filename)) {
        state.selectedImages.push(action.payload)
      }
    },
    removeImage: (state, action) => {
      const selectedImage = state.selectedImages.findIndex(image =>
        image.filename === action.payload.filename &&
        image.name === action.payload.name
      )

      if (selectedImage !== -1) {
        state.selectedImages.splice(selectedImage, 1)
      }

      const showedImage = state.showedImages.findIndex(image =>
        image.filename === action.payload.filename &&
        image.name === action.payload.name
      )

      if (showedImage !== -1) {
        state.showedImages.splice(showedImage, 1)
      }
    },
    removeImages: (state, action) => {
      state.selectedImages = []
      state.showedImages = []
    }
  }
})

export const { setImageGallery, showImage, showImages, addImage, removeImage, removeImages } = imagesSlice.actions

export default imagesSlice.reducer
