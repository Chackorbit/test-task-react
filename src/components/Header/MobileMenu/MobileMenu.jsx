import s from './MobileMenu.module.css';
import { ReactComponent as LogoMobMenu } from 'svg/Group.svg';

export default function MobileMenu({ onOpenMenu }) {
  const closeMenu = e => {
    if (e.target === e.currentTarget) {
      onOpenMenu();
    }
  };
  return (
    <div className={s.overfloy} onClick={closeMenu}>
      <div className={s.mob_menu}>
        <div className={s.header_logo}>
          <a href="#first_block" className={s.link_logo}>
            <LogoMobMenu />
            TESTTASK
          </a>
        </div>

        <ul>
          <li className={s.menu_item}>About me</li>
          <li className={s.menu_item}>Relationship</li>
          <li className={s.menu_item}>Users</li>
          <li className={s.menu_item}>Sign up</li>
          <li className={s.menu_item}>Terms and Conditions</li>
        </ul>
      </div>
    </div>
  );
}
