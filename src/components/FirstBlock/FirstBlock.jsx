import s from './FirstBlock.module.css';
import BtnSignUp from '../BtnSignUp/BtnSignUp';

export default function FirstBlock() {
  return (
    <section className={s.section} id="first_block">
      <div className={s.container}>
        <h1 className={s.title}>Test assignment for front-end developers</h1>
        <p className={s.text}>
          Front-end developers make sure the user sees and interacts with all
          the necessary elements to ensure conversion. Therefore, responsive
          design, programming languages and specific frameworks are the
          must-have skillsets to look for when assessing your front-end
          developers.
        </p>

        <a href="#register">
          <BtnSignUp>Sign up</BtnSignUp>
        </a>
        {/* <button className={s.button}>Sign up</button> */}
      </div>
    </section>
  );
}
