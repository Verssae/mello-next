import { useState, useRef, useEffect } from "react"
import styles from "./player.module.css"
import utilStyles from "../styles/utils.module.css"

import { PlayButton, Timer, Progress } from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';


const AWSSoundPlayer = withCustomAudio(props => {
  const { trackTitle } = props;
 
  return (
    <div>
      <Progress {...props} />
      <PlayButton {...props} />
      <h2>{trackTitle}</h2>
      <Timer {...props} />
    </div>
  );
});

export default function Player ({ path }) {
 
  const trackTitle = '어깨는 꾸준히 단련해야 하는 법';

  return (
    <div className={utilStyles.container}>
      <div className={styles.content}>
        <AWSSoundPlayer
          streamUrl={path}
          trackTitle={trackTitle} 
          preloadType="auto" />
      </div>
    </div>
  );
};