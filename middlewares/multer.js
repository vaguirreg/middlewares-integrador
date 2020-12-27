const multer = require('multer');
const path = require('path');

const publicImagesPath = path.resolve(__dirname, '../../../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(publicImagesPath, 'users'));
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname} - ${Date.now()}${path.extname(file.originalname)}`);
    }
});

module.exports = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        const accepted = acceptedExtensions.includes(path.extname(file.originalname));

        if(!accepted){
            req.files = [...req.files, file];
        }

        cb(null, accepted);
    }
});