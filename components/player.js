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
      <p className={styles.text}>{trackTitle}</p>
      <Timer {...props} />
    </div>
  );
});

export default function Player ({ path, trackTitle }) {
 
  return (
    <div className={utilStyles.container}>
      
      {path != "" ? <div className={styles.content}>
        <AWSSoundPlayer
          streamUrl={`downloads/${path}`}
          trackTitle={trackTitle} 
          preloadType="auto" />
      </div> : "loading"}
    </div>
  );
};