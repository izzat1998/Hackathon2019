import multer from 'multer';

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Please uploade only image formats jpeg | jpg | png'));
  }
}

const limits = {
  fileSize: 1024 * 1024 * 50,
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './images');
  },
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString()}${file.originalname}`);
  },
});

export default (name) => multer({
  fileFilter, // allows to write by formats of the file
  limits, // checks limit is in bounds up to 5mb
  storage, // Stores image to localdisk
}).single(name);
