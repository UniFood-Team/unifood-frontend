
import styles from './NavBarraTop.module.css';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';


//icones
import { FaRegCommentDots } from "react-icons/fa";
import { RiNotification2Line } from "react-icons/ri";
import { SlPresent } from "react-icons/sl";
import { FiSettings } from "react-icons/fi";


export default function Topbar() {
  return (
    <div className={styles.topbarra}>
      <div className={styles.searchContainer}>
        <span className={styles.spanSearch}>
          <InputText placeholder="Buscar" className={styles.searchInput}/>
          <i className={`pi pi-search ${styles.inputIcon}`}></i>
        </span>
      </div>

      <div className={styles.rightIcons}>
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


        <div className={styles.userSection}>
          <span className={styles.greeting}>Olá, Fulano de Tal</span>
          <Avatar icon="pi pi-user" shape="circle" size="large" />
        </div>
      </div>
    </div>
  );
}
