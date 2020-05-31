// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
      cb(null, getFile(file));
  }
});

function getFile(file) {
  let oriFile = file.originalname;
  let ext = path.extname(oriFile);
  let name = path.basename(oriFile, ext);
  let rnd = Math.floor(Math.random() * 90) + 10; // 10 ~ 99
  return Date.now() + '-' + rnd + '-' + name + ext;
}

let upload = multer({
  storage: storage
});


export default (req, res) => {
  console.log(req.body)
  console.log(req.files)
  // fetch("https://27.96.130.116:16006/uploads", {
  //     method: 'POST',
  //     body: req.body
  //   }).then(response => response.json())
  //     .then(({ result }) => res.send(result))
  //     .catch(error => res.send(error))
}

