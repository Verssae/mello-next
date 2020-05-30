import Head from "next/head"
import Layout, { siteTitle } from "../../components/layout"
import { AudioPlayerProvider, useAudioPlayer } from "react-use-audio-player"
import { getAudio } from "../../lib/mellotron"
import { GetStaticProps } from "next"

const AudioPlayer = ({ file }) => {
    const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
        src: file,
        format: "wav",
        autoplay: false
    })

    if (!ready && !loading) return <div>No audio to play</div>
    if (loading) return <div>Loading audio</div>

    return (
        <div>
            <button onClick={togglePlayPause}>{playing ? "Pause" : "Play"}</button>
        </div>
    )
}

export default function Result({ filename, ok }: { filename: string, ok: boolean }) {
    console.log(filename)
    console.log(ok)
    return (
        <AudioPlayerProvider>
            <Layout>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <section>
                    <h1>변환된 음성 듣기</h1>
    {ok ? <AudioPlayer file={`../../downloads/${filename}`} /> : "Loading"}
                </section>
            </Layout>
        </AudioPlayerProvider>

    )
}

export async function getStaticPaths() {
    return {
        paths: [

        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log("getstaticprops:")
    const { filename } = params
    console.log(filename)
    
    const data = await getAudio(filename)
    console.log(data)
    return {
        props: data
    }
}