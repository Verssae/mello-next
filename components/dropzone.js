import styles from "./dropzone.module.css"
import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'

export default function Dropzone({callback}) {

  const [file, setFile] = useState(null)

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles)
  }, [])

  useEffect(()=> {
    callback(file)
  }, [file])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className={styles.container}>
      <div {...getRootProps()} className={
        isDragActive ?
        styles.active :
        styles.zone
      }>
        <input {...getInputProps()} />
        <img src="/images/wav.svg" alt="wav" width="60px" />
        <p>{file !=null ? file[0].path : "파일을 여기로 끌어 놓으세요"}</p>
      </div>
    </div>
  )
}