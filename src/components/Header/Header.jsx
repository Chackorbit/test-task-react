import s from './Header.module.css';
import { ReactComponent as Logo } from '../../svg/Group.svg';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.header_logo}>
        <a href="/" className={s.link_logo}>
          <Logo />
          TESTTASK
        </a>
      </div>
      <nav>
        <ul className={s.ul_nav}>
          <li className={s.nav_item}>About me</li>
          <li className={s.nav_item}>Relationships</li>
          <li className={s.nav_item}>Requirements</li>
          <li className={s.nav_item}>Users</li>
          <li className={s.nav_item}>Sign Up</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
