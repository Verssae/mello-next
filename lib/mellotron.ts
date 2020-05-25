import fs from 'fs'

const downloadFile = (async (filename: string) => {
    const url = `http://27.96.130.116:16006/downloads/${filename}`
    const path = `downloads/${filename}`
    const res = await fetch(url)
    if (res.ok) {
        const fileStream = fs.createWriteStream(path);
        return await new Promise((resolve :Function , reject:Function) => {
            res.body.pipe(fileStream)
            res.body.on("error", (err) => {
              reject("err")
            });
            fileStream.on("finish", function() {
              resolve(filename)
            })
          }).then(x=>({data: x , ok: true})).catch(x=>({data: x, ok:false}))
    } else {
        return ({data: "error", ok:false})
    }
  })

export async function getAudio(filename: string) {
    return await downloadFile(filename)
}
