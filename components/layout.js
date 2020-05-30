import Head from 'next/head'
import styles from './layout.module.css'

export const siteTitle = 'Mellotron STS website'

export default function Layout({children}) 
{
    return (
        <div className={styles.container}>
            <Head>
                <meta name="description" content="Mellotron STS Website using Next.js" />
            </Head>
            <main>{children}</main>
        </div>
    )
}