import Head from "next/head"
import Layout, { siteTitle } from "../components/layout"
import AudioPlayer from "react-audio-player"
import { AudioPlayerProvider } from "react-audio-player"
export default function Result () {

    return (
        <AudioPlayerProvider>
 <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head> 
            <section>
                <h1>변환된 음성 듣기</h1>
                <AudioPlayer file="1.mp3" />
            </section>
        </Layout>
        </AudioPlayerProvider>
       
    )
}