import s from './FirstBlock.module.css';
import BtnSignUp from '../BtnSignUp/BtnSignUp';

export default function FirstBlock() {
  return (
    <section className={s.section} id="first_block">
      <div className={s.container}>
        <h1 className={s.title}>Test assignment for front-end developers</h1>
        <p className={s.text}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>

        <a href="#register">
          <BtnSignUp>Sign up</BtnSignUp>
        </a>
        {/* <button className={s.button}>Sign up</button> */}
      </div>
    </section>
  );
}
