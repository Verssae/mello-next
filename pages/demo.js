import Layout from "../components/layout"
import Dropzone from "../components/dropzone"
import Player from "../components/player"
import Progress from "../components/progress"
import { useState, useRef, useEffect } from "react"
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  const [loading, setLoading] = useState("NO FILE")
  const [file, setFile] = useState(null)
  const [result, setResult] = useState("")
  const [trans, setTrans] = useState("")
  const fileRef = useRef()
  const audioRef = useRef()
  const [speaker, setSpeaker] = useState("kss")

  const upload = async (data) => {
    setLoading("UPLOADING FILE")
    console.log("Call upload api")

    // const res = await fetch("/api/upload", {
    //   method: 'POST',
    //   body: file,
    //   headers: {
    //     "Content-Type": "audio/wav",
    //     "Speaker": speaker
    //   }
    // });
    // console.log("Send done");

    // console.log(json)

    // const response = await fetch("http://27.96.130.116:16006/uploads", {
    const response = await fetch("/api/upload", {
      method: 'POST',
      body: data
    })
    return await (response.json())
  }

  const inference = async (filepath) => {
    console.log("Init inference")
    const result = await fetch(`/api/inference?filepath=${filepath}&speaker=${speaker}`)
    console.log(result)
    return await result.json()
  }

  const download = async (name) => {
    setLoading("DOWNLOADING FILE")
    const result = await fetch(`/api/download?filename=${name}`)
    const {filename} = await (result.json())
    setLoading("DOWNLOAD COMPLETE")
    console.log(filename)
    setResult(filename)
  }

  const fetching = async () => {
    let data = new FormData()
    if (file != null) {
      data.append('file', file)
      const {filepath} = await upload(data)
      console.log(filepath)
      const {filename, text} = await inference(filepath)
      console.log(filename, text)
      setTrans(text)
      await download(filename)
    }
  }

const tempFetching = () => {
  if (file != null) {
    setLoading("UPLOADING FILE")
    setTimeout(() => {
      setLoading("DOWNLOADING FILE")
      setTimeout(() => {
        setLoading("DOWNLOAD COMPLETE")
        setResult("temp.wav")
      }, 3000)
    }, 3000)
  }
}


  const compByLoading = (loading) => {
    switch (loading) {
      case "NO FILE" :
        return <Dropzone callback={fileHandler} />
      case "UPLOADING FILE" :
      case "DOWNLOADING FILE" : 
        return <Progress filename={file.name}/>
      case "DOWNLOAD COMPLETE" : 
        return <Player path={result} trackTitle={trans} />
    }

}

const fileHandler = (file) => {
  setFile(file)
}

useEffect(() => {
  setResult("")
  fetching()
  // tempFetching()
}, [file, speaker])

const siteTitle = "Mellotron STS Demo"

return (
  <Layout siteTitle={siteTitle}>
    <section>
      <img src="/images/audio.svg" alt="audio Logo" width="100px" />
      <p>화자의 스타일을 입히기</p>
    </section>
    <section>
      <div className={`${utilStyles.card} ${speaker == "kss" ? utilStyles.active : utilStyles.nonactive}`} onClick={() => setSpeaker("kss")}>
        <img src="/images/kss.svg" alt="audio Logo" width="50px" />
        <p>김양주</p>
      </div>
      <div className={`${utilStyles.card} ${speaker == "you" ? utilStyles.active : utilStyles.nonactive}`} onClick={() => setSpeaker("you")}>
        <img src="/images/yu.svg" alt="audio Logo" width="50px" />
        <p>유희영</p>
      </div>
    </section>
    <section>
      {compByLoading(loading)}
    </section>

  </Layout>
)
}

// export const getStaticProps: GetStaticProps = async() => {
//   const data = await getAudio("1.wav")
//   return {
//     props: data
//   }
// }

// http://27.96.130.116:16006/temp.wav