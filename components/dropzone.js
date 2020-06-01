import styles from "./dropzone.module.css"
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function Dropzone() {

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className={styles.container}>
      <div {...getRootProps()} className={styles.zone}>
        <input {...getInputProps()} />
        <img src="/images/wav.svg" alt="wav" width="60px" />
        <p>파일을 여기로 끌어 놓으세요</p>
      </div>
    </div>
  )
}