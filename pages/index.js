import Layout from "../components/layout"
import Dropzone from "../components/dropzone"
import Player from "../components/player"
import Progress from "../components/progress"
import { useState, useRef, useEffect } from "react"
import utilStyles from '../styles/utils.module.css'

export default function Home() {

  const siteTitle = "Mellotron STS website"

  return (
    <Layout siteTitle={siteTitle}>
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