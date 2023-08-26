import { ReactMediaRecorder } from "react-media-recorder";
import styles from "../webCam/_webCam.module.scss";
import Button from "../../Utils/button/Button";
import VideoPreview from "../webCam/VedioPreview";

const Screen = () => (
  <div>
    <ReactMediaRecorder
      screen
      render={({
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        previewStream,
      }) => (
        <div className={styles.container}>
          <p className={styles.status}>{status}</p>

          {console.log(status)}
          {status === "idle" ? null : status !== "stopped" ? (
            <VideoPreview stream={previewStream} scr={mediaBlobUrl} />
          ) : (
            <video src={mediaBlobUrl} controls className={styles.preview} />
          )}

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

export default Screen;
