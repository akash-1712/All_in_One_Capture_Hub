import { ReactMediaRecorder } from "react-media-recorder";

import styles from "../webCam/_webCam.module.scss";
import Button from "../../Utils/button/Button";

const Audio = () => (
  <div>
    <ReactMediaRecorder
      audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div className={styles.container}>
          <p className={styles.status}>{status}</p>

          {console.log(status)}
          {status === "stopped" ? (
            <audio src={mediaBlobUrl} controls className={styles.preview} />
          ) : null}

          <div className={styles.container_btn}>
            {status !== "recording" ? (
              <Button onClick={startRecording}>Start Recording</Button>
            ) : (
              <Button onClick={stopRecording}>Stop Recording</Button>
            )}
          </div>
        </div>
      )}
    />
  </div>
);

export default Audio;
