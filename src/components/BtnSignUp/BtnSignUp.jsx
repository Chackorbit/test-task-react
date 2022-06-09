import s from './BtnSignUp.module.css';

export default function BtnSignUp({
  type = 'button',
  children,
  showMore,
  isSubmitting,
}) {
  return (
    <button
      className={s.button}
      onClick={showMore}
      type={type}
      disabled={isSubmitting}
    >
      {children}
    </button>
  );
}
