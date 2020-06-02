import {getAudio} from "../../lib/mellotron"

export default async (req, res) => {
  console.log("uploadjs")
  console.log(req.query)
  const {filename, ok} = await getAudio(req.query)
  console.log(filename)
  console.log(ok)

  if (ok) {
    res.statusCode = 200
    res.end(JSON.stringify({filename : filename}))
  } else {
    res.statusCode = 500
    res.end(JSON.stringify({filename : "internel error"}))
  }
}

