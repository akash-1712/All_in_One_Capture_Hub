import styles from "./_about.module.scss";
import { useSelector } from "react-redux";
function About() {
  const user = useSelector((state) => state.user);
  return (
    <div className={styles.top}>
      <div className={styles.div_img}>
        <img src={user.image} alt={user.name} />
      </div>
      <div className={styles.div_name}>
        <h1> {user.name}</h1>
      </div>
    </div>
  );
}

export default About;
