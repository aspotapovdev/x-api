const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');

const UPLOADS_DIR = process.env.UPLOADS_DIR || 'uploads';

const uploadDir = path.join(__dirname, `../../assets/${UPLOADS_DIR}`);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter,
}).single('avatar');

const uploadAsync = util.promisify(upload);

const FileUploadService = {
  uploadFile: async (req, res) => {
    await uploadAsync(req, res);
    if (req.file) {
      return `${req.protocol}://${req.get('host')}/${UPLOADS_DIR}/${req.file.filename}`;
    }

    return null;
  },
};

module.exports = FileUploadService;
