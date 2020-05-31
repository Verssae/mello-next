import Head from "next/head"
import Layout, { siteTitle } from "../../components/layout"
import { getAudio } from "../../lib/mellotron"
import { useRouter } from "next/router"


export default function Result({ filename, ok }) {
    const router = useRouter()
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <button onClick={() => router.back()}>뒤로 가기</button>
            <section>
                <h1>변환된 음성 듣기</h1>
                <audio src={`../../downloads/${filename}`} controls></audio>
            </section>
        </Layout>
    )
}

export async function getStaticPaths() {
    return {
        paths: [

        ],
        fallback: true
    }
}

export const getStaticProps = async ({ params }) => {
    console.log("getstaticprops:")
    const { filename } = params
    console.log(filename)

    const data = await getAudio(filename)
    console.log(data)
    return {
        props: data
    }
}