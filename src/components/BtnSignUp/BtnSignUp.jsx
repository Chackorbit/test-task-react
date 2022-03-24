import s from './BtnSignUp.module.css';

export default function BtnSignUp({
  type = 'button',
  children,
  showMore,
  positionBtn,
}) {
  return (
    <button className={s.button} onClick={showMore} type={type}>
      {children}
    </button>
  );
}
