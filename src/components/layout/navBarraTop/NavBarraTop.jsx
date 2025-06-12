import styles from "./NavBarraTop.module.css";
import SearchBox from "../search/Search";
import NotificationIcons from "../notificacaoIcons/NotificaIcons";
import UserSection from "../avatarUser/AvatarUser";

export default function NavBarraTop() {
  return (
    <div className={styles.topbarra}>
      <div className={styles.searchContainer}>
        <SearchBox />
      </div>
      <div className={styles.rightIcons}>
        <NotificationIcons />
        <UserSection />
      </div>
    </div>
  );
}
