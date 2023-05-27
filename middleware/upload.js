import multer from "multer"

// Image Storage Config
const config = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../uploads")
  },
  filename: (req, file, callback) => {
    callback(null, `img-${file.originalname}-${Date.now()}`)
  },
})

// Is Image
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("img")) {
    callback(null, true)
  } else {
    callback(null, Error("❌️ Only image is allowed!"))
  }
}

// Upload
const upload = multer({
  storage: config,
  fileFilter: isImage,
})

export default upload
