import Layout from "../components/layout"
import Dropzone from "../components/dropzone"
import { useRouter } from "next/router"
import { useState, useRef, useEffect } from "react"
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  const [loading, setLoading] = useState("NO FILE")
  const [file, setFile] = useState(null)
  const [result, setResult] = useState("")
  const fileRef = useRef()
  const audioRef = useRef()
  const [speaker, setSpeaker] = useState(0)

  const fetching = () => {
    
    let data = new FormData()
    if (file != null) {
      data.append('file', file)
      data.append('speaker', speaker)
      setLoading("UPLOADING FILE")
      fetch("http://27.96.130.116:16006/uploads", {
        method: 'POST',
        body: data
      }).then(response => response.json())
      .then(({ result }) => {
        setLoading("DOWNLOADING FILE")
        fetch(`/api/upload?filename=${result}`)
        .then(response => response.json())
        .then(({filename})=> {
          setLoading("DOWNLOAD COMPLETE")
          setResult(filename)
        })
        .catch(e=>setLoading("DOWNLOAD ERROR"))
      })
      .catch(e=>setLoading("UPLOADING ERROR"))
    } else {
      setLoading("NO FILE")
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
        },3000)
      },3000)
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

  useEffect(()=>{
    console.log(file)
    console.log(speaker)
    // fetching()
    tempFetching()
  },[file, speaker])

  const siteTitle = "Mellotron STS website"

  return (
    <Layout siteTitle={siteTitle}>
      <section>
        <img src="/images/audio.svg" alt="audio Logo" width="100px" />
        <p>화자의 스타일을 입히기</p>
      </section>
      <section>
        <div className={`${utilStyles.card} ${speaker == 0 ? utilStyles.active : utilStyles.nonactive}`} onClick={()=>setSpeaker(0)}>
          <img src="/images/kss.svg" alt="audio Logo" width="50px" />
          <p>김양주</p>
        </div>
        <div className={`${utilStyles.card} ${speaker == 1 ? utilStyles.active : utilStyles.nonactive}`} onClick={()=>setSpeaker(1)}>
          <img src="/images/yu.svg" alt="audio Logo" width="50px" />
          <p>유희영</p>
        </div>
      </section>
      <section>
        <Dropzone callback={fileHandler} file={file} loading={loading} result={result}></Dropzone>
      </section>
      <section>
        <hr />
      </section>
     

      <section>
        <p>{loading}</p>
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