import { useEffect, useRef } from "react";
import styles from "./_webCam.module.scss";

const VideoPreview = ({ stream, mediaBlobUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <video
      ref={videoRef}
      className={styles.preview}
      src={mediaBlobUrl}
      autoPlay
      controls
    />
  );
};

export default VideoPreview;
