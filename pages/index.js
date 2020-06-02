import Layout from "../components/layout"
import Dropzone from "../components/dropzone"
import Player from "../components/player"
import Progress from "../components/progress"
import { useState, useRef, useEffect } from "react"
import utilStyles from '../styles/utils.module.css'

export default function Home() {

  const siteTitle = "Mellotron STS Website"

  return (
    <Layout siteTitle={siteTitle}>
      <div className={utilStyles.main}>
      <iframe width="100%" height="600" src="https://www.youtube.com/embed/RrtcuWNVuNc?controls=0&amp;start=1&amp;autoplay=1&amp;rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h3 className={utilStyles.h3}>Voice Imitator</h3>
        <hr className={utilStyles.narrow}/>
        <p className={utilStyles.name}>한양대학교 ERICA 캠퍼스 2020-1 컴퓨터캡스톤디자인</p>
      </div>
    </Layout>
  )
}
