// Backend
import formidable from 'formidable';
import FormData from 'form-data'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {

  const form = new formidable.IncomingForm();
  form.uploadDir = "public/uploads";
  form.keepExtensions = true;
  form.on('file', function(field, file) {
    console.log(`Upload ${file.name} to ${file.path}`)
    res.statusCode = 200
    res.end(JSON.stringify({filepath : file.path}))
  })

  form.parse(req, function(err, fields, files) {
    console.log("done.")
  })
}