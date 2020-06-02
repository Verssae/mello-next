import { useState, useRef, useEffect } from "react"
import styles from "./progress.module.css"
import utilStyles from "../styles/utils.module.css"

import Loader from 'react-loader-spinner'

export default function Progress ({ filename }) {

  return (
    <>
      <div className={utilStyles.container}>
        <div className={styles.content}>
          <Loader
            type="Bars"
            color="#FC561E"
            height={100}
            width={100}
          />
          <p className={styles.name}>{filename}</p>
        </div>
      </div>
    </>
  )
}