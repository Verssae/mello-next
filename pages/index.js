import Layout from "../components/layout"
import Dropzone from "../components/dropzone"
import { useRouter } from "next/router"
import { useState, useRef, useEffect } from "react"

export default function Home() {
  const [loading, setLoading] = useState("")
  const fileRef = useRef()
  const speakerRef = useRef()
  const audioRef = useRef()
  const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading("Loading...")
    let data = new FormData()
    if (fileRef.current && speakerRef.current) {
      data.append('file', fileRef.current.files[0])
      data.append('speaker', speakerRef.current.value)
      console.log(data.get("file"))
      await fetch("http://27.96.130.116:16006/uploads", {
        method: 'POST',
        body: data
      }).then(response => response.json())
      .then(({ result }) => router.push(`/result/${result}`))
      .then(e=>setLoading("Page Loading...!"))
      .catch(e=>setLoading("Fetch Error"))
    } else {
      setLoading("다시 폼을 작성")
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

  const siteTitle = "Mellotron STS website"

  return (
    <Layout siteTitle={siteTitle}>
      <section>
        <img src="/images/audio.svg" alt="audio Logo" width="100px" />
        <p>화자의 스타일을 입히기</p>
      </section>
      <section>
        <Dropzone></Dropzone>
      </section>
      <section>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <p>변환할 음성을 선택하세요 : </p>
          <input
            ref={fileRef}
            onChange={onChangeHandler}
            type='file'
            accept="audio/*"
            capture="microphone"
            name='file'
          />
          
          <audio ref={audioRef} controls></audio>
         
          <p>원하는 목소리를 선택하세요 : </p>
          <select ref={speakerRef}>
            <option defaultValue="kss">KSS</option>
            <option value="you">유희열</option>
          </select>
          <hr />
          <button onClick={onSubmit} type="submit">제출</button>
        </form>
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