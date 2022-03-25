import s from './Footer.module.css';
import { ReactComponent as LogoFooter } from '../../svg/LOGO-abz.agecy.svg';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.first_block}>
        <p>© abz.agency specially for the test task</p>
      </div>

      <div className={s.second_block}></div>

      <div className={s.third_block}>
        <div className={s.logoFooter}>
          <LogoFooter />
        </div>

        <p className={s.homepage_footer}>0201 - Homepage - 1024</p>
      </div>
    </footer>
  );
};

export default Footer;
