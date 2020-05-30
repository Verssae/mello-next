import React, { useState } from "react"


export default function Recorder() {
    const [active, setActive] = useState(false)
    const [chunk, setChunk] = useState([])
    const [recorder, setRecorder] = useState(null)
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => {
            setRecorder(new MediaRecorder(stream))
            recorder.ondatavailable = e => {
                setChunk(chunk => chunk.push(e.data))
            }
            recorder.onstop = e => {
                console.log("recorder stopped");

                const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                chunks = [];
                const audioURL = window.URL.createObjectURL(blob);
                audio.src = audioURL;

            }
        })


    const onClick = (e) => {
        e.preventDefault()
        if (active) {
            recorder.stop()
        } else {
            recorder.start()

            console.log(recorder.state)
        }
        setActive(!active)

    }
    return (
        <div>
            <button onClick={onClick}>{active ? "stop" : "start"}</button>
        </div>
    )
}