import { FaRegCommentDots } from "react-icons/fa";
import { RiNotification2Line } from "react-icons/ri";
import { SlPresent } from "react-icons/sl";
import { FiSettings } from "react-icons/fi";
import styles from './NotificaIcons.module.css';

export default function NotificaIcons() {
  return (
    <div className={styles.iconGroup}>
      <div className={`${styles.iconBox} ${styles.lightBlue}`}>
        <RiNotification2Line className={styles.icon} />
        <span className={styles.badge}>2</span>
      </div>
      <div className={`${styles.iconBox} ${styles.lightBlue}`}>
        <FaRegCommentDots className={styles.icon} />
        <span className={styles.badge}>+9</span>
      </div>
      <div className={`${styles.iconBox} ${styles.gray}`}>
        <SlPresent className={styles.iconPresent} />
        <span className={styles.badge}>15</span>
      </div>
      <div className={`${styles.iconBox} ${styles.pink}`}>
        <FiSettings className={styles.iconSetting} />
        <span className={styles.badge}>19</span>
      </div>
    </div>
  );
}
