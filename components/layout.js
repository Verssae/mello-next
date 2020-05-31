import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export const siteTitle = 'Mellotron STS website'

export default function Layout({ children }) {
  return (
    <>
      <navbar className={styles.navbar}>
        <Link href="/">
          <div className={styles.brand}>
            <img
              src="/images/verssae.png"
              className={`${styles.brandLogo}`}
              alt="Product Logo"
            />
            <span className={styles.brandName}>Voice Imitator</span>
          </div>
        </Link>
        <ul className={styles.navitem}>
          <li>
            <Link href="#home"><a>소개</a></Link>
          </li>
          <li>
            <Link href="#home2"><a>데모</a></Link>
          </li>
        </ul>
        <a href="https://github.com/Verssae/mello-next" target="_blank" className={styles.github}>
          <img
            src="/images/GitHub-Mark-64px.png"
            alt="Github"
          />
        </a>
      </navbar>
      <div className={styles.container}>
        <Head>
          <meta name="description" content="Mellotron STS Website using Next.js" />
        </Head>
        <main>{children}</main>
      </div>
    </>
  )
}