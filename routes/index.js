var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var PATH = '';

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var name = req.body.name;
    PATH = `./public/uploads/${name}`;
    if (!fs.existsSync(PATH)){
      fs.mkdirSync(PATH);
  }
    cb(null, PATH);
  },

  filename: (req, file, cb) => {
    cb(null, (getFileCount(PATH)+1)+path.extname(file.originalname))
  }  
});

function getFileCount(dir){
  filenames = fs.readdirSync(dir);
  return filenames.length;
}
var upload = multer({
  storage: storage
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node App Express' });
});

/* Get register-face page*/
router.get('/register-face',(req,res)=>{
  res.render('register-face');
});
/* GET  login page */
router.get('/login',(req,res)=>{
  res.render('login');
});
//GET Register page
router.get('/register',(req,res)=>{
  res.render('register');
});
//GET Logout page
router.get('/logout',(req,res)=>{
  res.render('logout');
});

router.get('/video-detection',(req,res)=>{
  res.render('video-detection');
});

router.post('/register2',upload.single('image'),(req,res)=>{
  console.log(req.body.name);
     
   if (!req.file) {
    console.log("No file is available!");
    return res.redirect('/register-face');

  } else {
    console.log('File is available!');
    return res.redirect('/')
  }
})
module.exports = router;
