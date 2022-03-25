import s from './BtnSignUp.module.css';

export default function BtnSignUp({ type = 'button', children, showMore }) {
  return (
    <button className={s.button} onClick={showMore} type={type}>
      {children}
    </button>
  );
}
