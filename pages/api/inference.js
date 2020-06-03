import FormData from 'form-data'
import fs from 'fs'
import request from 'request'

export default async (req, res) => {
  const {filepath, speaker} = req.query
  console.log(filepath, speaker)

  // let formData = new FormData()
  // formData.append('file', fs.createReadStream(filepath))
  // formData.append('speaker', speaker)

  // const response = await fetch("http://27.96.130.116:16006/uploads", {
  //   method: 'POST',
  //   body: formData,
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   }
  // })


  const formData={
    file: {
      value:  fs.createReadStream(filepath),
      options: {
        filename: 'b.wav',
        contentType: 'audio/wav'
      }
    }
  }
  
  request.post({
    url:'http://27.96.130.116:16006/uploads',
    formData: formData,
    headers: {
      'speaker': speaker
    }
  }, async function callback(err, httpResponse, body) {
    console.log("END CALLBACK")
    res.statusCode = 200
    res.end(JSON.stringify(JSON.parse(body)))
  });
}

