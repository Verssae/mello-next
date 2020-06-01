import {getAudio} from "../../lib/mellotron"

export default (req, res) => {
  const {filename, ok} = getAudio(req.body.query)
  if (ok) {
    res.statusCode = 200
    res.end(JSON.stringify({filename : filename}))
  } else {
    res.statusCode = 500
    res.end(JSON.stringify({filename : "internel error"}))
  }
}

