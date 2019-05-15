const config = require('../config/apiUrl')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {

        // error first callback
        cb(null, `${file.originalname}-${Date.now()}`)
    }
});

const upload = multer({ storage })

module.exports = app => {
    
    app.post(`${config.routeProd}/file/upload`, upload.single('file'), 
        (req, res) => res.send('<h2>Upload realizado com sucesso</h2>')); 

}