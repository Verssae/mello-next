import {getAudio} from "../../lib/mellotron"

export default async (req, res) => {
  const {filename, ok} = await getAudio(req.query)
  if (ok) {
    res.statusCode = 200
    res.end(JSON.stringify({filename : filename}))
  } else {
    res.statusCode = 500
    res.end(JSON.stringify({filename : "internel error"}))
  }
}

