import s from './Header.module.css';
import { ReactComponent as Logo } from '../../svg/Group.svg';
import { ReactComponent as MobMenu } from '../../svg/Menu.svg';

const Header = ({ openMenu }) => {
  return (
    <header className={s.header} id="header">
      <div className={s.header_logo}>
        <a href="#first_block" className={s.link_logo}>
          <Logo />
          TESTTASK
        </a>
      </div>
      <nav>
        <ul className={s.ul_nav}>
          <li className={s.nav_item}>
            <a href="#register">About me</a>
          </li>
          <li className={s.nav_item}>
            <a href="#register">Relationships</a>
          </li>
          <li className={s.nav_item}>
            <a href="#register">Requirements</a>
          </li>
          <li className={s.nav_item}>
            <a href="#register">Users</a>
          </li>
          <li className={s.nav_item}>
            <a href="#register">Sign Up</a>
          </li>
        </ul>

        <div className={s.mob_nav}>
          <button type="button" onClick={openMenu}>
            <MobMenu />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
