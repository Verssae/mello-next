import Layout from "../components/layout"
import Dropzone from "../components/dropzone"
import Player from "../components/player"
import Progress from "../components/progress"

import { useRouter } from "next/router"
import { useState, useRef, useEffect } from "react"
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  const [loading, setLoading] = useState("NO FILE")
  const [file, setFile] = useState(null)
  const [result, setResult] = useState("")
  const [text, setText] = useState("")
  const fileRef = useRef()
  const audioRef = useRef()
  const [speaker, setSpeaker] = useState("kss")

  const upload = async (data) => {
    setLoading("UPLOADING FILE")
    const response = await fetch("http://27.96.130.116:16006/uploads", {
      method: 'POST',
      body: data
    })
    return response.json()
  }

  const download = async (name) => {
    console.log(`download:${name}`)
    setLoading("DOWNLOADING FILE")
    const result = await fetch(`/api/upload?filename=${name}`)
    console.log(result)
    const {filename} = await (result.json())
    setLoading("DOWNLOAD COMPLETE")
    console.log(filename)
    setResult(filename)
  }

  const fetching = async () => {
    let data = new FormData()
    if (file != null) {
      data.append('file', file)
      data.append('speaker', speaker)
      const {filename, text} = await upload(data)
      console.log(filename)
      setText(text)
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
    console.log(file)
    switch (loading) {
      case "NO FILE" :
        return <Dropzone callback={fileHandler} />
      case "UPLOADING FILE" :
      case "DOWNLOADING FILE" : 
        return <Progress filename={file.name}/>
      case "DOWNLOAD COMPLETE" : 
        return <Player path={result} trackTitle={text} />
    }

}

const onChangeHandler = (e) => {
  e.preventDefault()
  const file = fileRef.current.files[0]
  const { current } = audioRef
  if (current && file) {
    current.src = URL.createObjectURL(file)
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

const siteTitle = "Mellotron STS website"

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
    <section>
      <hr />
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