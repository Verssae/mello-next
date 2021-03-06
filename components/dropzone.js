import styles from "./dropzone.module.css"
import utilStyles from "../styles/utils.module.css"
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function Dropzone({callback}) {

  const onDrop = useCallback(acceptedFiles => {
    callback(acceptedFiles[0])
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: onDrop,
    accept: "audio/wav"
  })

  return (
    <div className={`${utilStyles.container} ${styles.container}`}>
      <div {...getRootProps()} className={`
        ${isDragActive ? styles.zoneActive : styles.zone}
      `}>
        <input {...getInputProps()} />
        <img src="/images/wav.svg" alt="wav" width="60px" />
        <p>파일을 여기로 끌어 놓으세요</p>
      </div>
    </div>
  )
}