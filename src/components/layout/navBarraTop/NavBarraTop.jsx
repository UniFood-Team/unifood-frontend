import styles from './NavBarraTop.module.css';
import SearchBox from '../search/Search';
import NotificationIcons from '../notificacaoIcons/NotificaIcons';
import UserSection from '../avatarUser/AvatarUser';

export default function avBarraTop() {
  return (
    <div className={styles.topbarra}>
      <SearchBox />
      <div className={styles.rightIcons}>
        <NotificationIcons />
        <UserSection />
      </div>
    </div>
  );
}
