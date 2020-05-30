import Head from "next/head"
import { GetStaticProps } from "next"
import Layout, { siteTitle } from "../components/layout"
import { getAudio } from "../lib/mellotron"
import { FormEvent } from "react"
import Link from "next/link"
import {useRouter} from "next/router"
import { useState, useRef } from "react"

export default function Home() {
  const [result, setResult] = useState("nothing")
  const fileRef = useRef()
  const textRef = useRef()
  const speakerRef = useRef()
  const router = useRouter()
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    let data = new FormData()
    if (fileRef.current && textRef.current && speakerRef.current) {
      data.append('file', fileRef.current.files[0])
      data.append('text', textRef.current.value)
      data.append('speaker', speakerRef.current.value)
      await fetch("http://27.96.130.116:16006/uploads", {
        method: 'POST',
        body: data
      }).then(response => response.json()).then(({result}) => router.push(`/result/${result}`))
      setResult("done")
    } else {
      setResult("다시 폼을 작성")
    }
  }

  const handleDownloadClick = (e: FormEvent) => {
    e.preventDefault()
    router.push("/result/1.wav")
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h1>음성 제출</h1>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <p>변환할 음성을 선택하세요 : </p>
          <input
            ref={fileRef}
            type='file'
            name='file'
          />

          <p>음성의 내용을 입력하세요 : </p>
          <input
            ref={textRef}
            type="text"
            name="text"
          />
          <p>원하는 목소리를 선택하세요 : </p>
          <select ref={speakerRef}>
            <option defaultValue="kss">KSS</option>
            <option value="you">유희열</option>
          </select>
          <hr />
          <button onClick={onSubmit} type="submit">제출</button>
        </form>
      </section>
      <hr />
      <button onClick={handleDownloadClick}>Download</button>
      <section>
        <p>{result}</p>
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