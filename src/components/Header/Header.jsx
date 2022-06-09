import s from './Header.module.css';
import { ReactComponent as Logo } from '../../svg/Logo.svg';
import BtnSignUp from 'components/BtnSignUp/BtnSignUp';

const Header = () => {
  return (
    <header className={s.header} id="header">
      <div className={s.header_logo}>
        <a href="#first_block" className={s.link_logo}>
          <Logo />
        </a>
      </div>

      <nav>
        <ul className={s.ul_nav}>
          <li className={s.nav_item}>
            <a href="#users">
              <BtnSignUp>Users</BtnSignUp>
            </a>
          </li>
          <li className={s.nav_item}>
            <a href="#register">
              <BtnSignUp>Sign up</BtnSignUp>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
