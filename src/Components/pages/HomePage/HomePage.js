import { NavLink } from "react-router-dom";
import styles from "./_homePage.module.scss";
import btn from "../../Utils/button/_button.module.scss";
import style from "./homePage.css";

function HomePage() {
  const classes = styles.homepage + " " + style.hmp;
  return (
    <div className={classes}>
      <NavLink
        to="/webCam"
        ClassName={(isActive) => (isActive ? style.active : "")}
        end
      >
        <button className={btn.btn}>WebCam Recorder</button>
      </NavLink>
      <NavLink
        to="/audio"
        ClassName={(isActive) => (isActive ? style.active : "")}
        end
      >
        <button className={btn.btn}>Audio Recorder</button>
      </NavLink>
      <NavLink
        to="/screen"
        ClassName={(isActive) => (isActive ? style.active : "")}
        end
      >
        <button className={btn.btn}>Screen Recorder</button>
      </NavLink>
    </div>
  );
}

export default HomePage;
