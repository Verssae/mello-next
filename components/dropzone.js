import styles from "./dropzone.module.css"
import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'

export default function Dropzone({callback, file, loading, result}) {

  const onDrop = useCallback(acceptedFiles => {
    callback(acceptedFiles[0])
  }, [])

  const compByLoading = (loading) => {
    console.log(loading)
    switch (loading) {
      case "NO FILE" :
        return <p>파일을 여기로 끌어 놓으세요</p>
      case "UPLOADING FILE" :
        return <div><p>{file ? file.path : ""}</p><p>UPLOADING FILE</p></div>
      case "DOWNLOADING FILE" : 
        return <div><p>{file ? file.path : ""}</p><p>DOWNLOADING FILE</p></div>
      case "DOWNLOAD COMPLETE" : 
        return <audio src={result} controls/>
    }
  }

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
        
        {compByLoading(loading)}
      </div>
    </div>
  )
}