var express = require('express');
var cors = require('cors');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json()); 
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  let responseObject = {};
  responseObject['name'] = req.file.originalname;
  responseObject['type'] = req.file.mimetype;
  responseObject['size'] = req.file.size;
  console.log(responseObject);
  res.send(responseObject);
})