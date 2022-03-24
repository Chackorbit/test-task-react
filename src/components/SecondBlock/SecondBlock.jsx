import s from './SecondBlock.module.css';
import Background from 'img/Image-387x340@1x-min.png';
import BtnSignUp from '../BtnSignUp/BtnSignUp';

export default function SecondBlock() {
  return (
    <section className={s.section}>
      <img className={s.img} src={Background} alt="" />

      <div className={s.container}>
        <h2 className={s.title}>Let's get acquainted</h2>
        <p className={s.pre_title}>I'm a good front-end developer</p>
        <p className={s.text}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <div className={s.btn}>
          <BtnSignUp>Sign up</BtnSignUp>
        </div>
      </div>
    </section>
  );
}
