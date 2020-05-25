import Head from "next/head"
import {GetStaticProps} from "next"
import Layout, {siteTitle} from "../components/layout"
import {getAudio} from "../lib/mellotron"
import { FormEvent } from "react"
import Link from "next/link"
import Router from "next/router"

export default function Home () {
  const onSubmit = (e:FormEvent) => {
    Router.push("/result")
  }
  const handleSelect = (e:FormEvent) => {
    console.log(e)
  }
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        </Head>
        <section>
          <h1>음성 제출</h1>
         <form method="post" action="http://27.96.130.116:16006/uploads" onSubmit={onSubmit} encType="multipart/form-data">
           <p>변환할 음성을 선택하세요 : </p>
          <input
            type='file'
            name='file'
           />
          
           <p>음성의 내용을 입력하세요 : </p>
           <input 
            type="text"
            name="text"
            />
            <p>원하는 목소리를 선택하세요 : </p>
            <select onChange={e => handleSelect(e)}>
              <option defaultValue="kss">KSS</option>
              <option value="you">유희열</option>
            </select>
            <hr />
           <button onClick={onSubmit} type="submit">제출</button>
         </form>
        </section>
        <hr />
        <section>

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