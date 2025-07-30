import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['.csv', '.xlsx', '.xls'];
  const ext = file.originalname.split('.').pop();
  if (!allowed.includes(`.${ext}`)) {
    return cb(new Error('Only csv, xlsx, xls files are allowed'), false);
  }
  cb(null, true);
};

const csvUpload = multer({ storage, fileFilter });

export default csvUpload;
