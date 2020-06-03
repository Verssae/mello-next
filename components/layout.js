import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Router from "next/router"

export default function Layout({ children, siteTitle }) {
  return (
    <>
      <nav className={styles.navbar}>
        
          <div className={styles.brand} onClick={()=>Router.reload()}>
            <img
              src="/images/verssae.png"
              className={`${styles.brandLogo}`}
              alt="Product Logo"
            />
            <span className={styles.brandName}>Voice Imitator</span>
          </div>
        <ul className={styles.navitem}>
          <li>
            <Link href="/"><a>소개</a></Link>
          </li>
          <li>
            <Link href="/demo"><a>서비스</a></Link>
          </li>
        </ul>
        <a href="https://github.com/Verssae/mello-next" target="_blank" className={styles.github}>
          <img
            src="/images/GitHub-Mark-64px.png"
            alt="Github"
          />
        </a>
      </nav>
      <div className={styles.container}>
        <Head>
          <meta name="description" content="Mellotron STS Website using Next.js" />
          <title>{siteTitle}</title>
        </Head>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </>
  )
}