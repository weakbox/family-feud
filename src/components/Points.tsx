import CountUp from "react-countup";
import styles from "./Points.module.css";

interface PointsProps {
  totalPoints: number;
}

function Points({totalPoints}: PointsProps) {
  return (
    <div className={styles.wrapper}>
      <input 
      type="text" 
      maxLength={16}
      placeholder="Team Name"/>
      <CountUp
        className={styles.points}
        duration={1}
        end={totalPoints}
        preserveValue={true}
      />
    </div>
  );
}

export default Points;
