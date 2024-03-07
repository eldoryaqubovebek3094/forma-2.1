const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;
app.get('/start',(req,res)=>{
  res.send('<h1>ok hammasi joyida ✅</h1>')
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:5500', 'http://webmas.uz'] }));
// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'rasmlar');
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, uploadDir);
      }
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(cors());

// Serve static files from the 'public' directory
const publicDir = path.join(__dirname, 'public');
fs.mkdir(publicDir, { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  }
});
app.use(express.static(publicDir));

// Handle form submission
app.post('/contact', upload.single('image'), (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const phoneNumber = req.body.phoneNumber;
  const amount = req.body.amount;
  const image = req.file;

  // Create an object with the form data including current date and time
  function getTime() {
    //yil oy kun
    const now = new Date();
    const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    const month =
      now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
    const year = now.getFullYear();
  
    //soat minut sekund
    const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    const minute =
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    const second =
      now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  
    const months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ];
  
    const month_title = now.getMonth();
  
 
    //return qilamiz
    return ` ${date}.${months[month_title]}.${year} yil,${hour}:${minute}:${second}`;
  }
  
  setInterval(getTime, 1000);
  const formData = {
    name,
    message,
    phoneNumber,
    amount,
    image: image ? image.filename : null,
    timestamp: getTime()
  };

  // Assuming data.json already exists and is an array of objects
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    try {
      const jsonData = JSON.parse(data);
      const existingImage = jsonData.find(item => item.image === formData.image);
      if (existingImage) {
        return res.status(400).send('Bu nomdagi rasm avval yuklangan. Boshqa rasm yuklash uchun boshqa nom kiriting.');
      }
      jsonData.push(formData);
      fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});