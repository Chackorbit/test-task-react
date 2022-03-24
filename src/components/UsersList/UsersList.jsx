import s from './UsersList.module.css';
import UsersItem from './UsersItem/UsersItem';
import BtnSignUp from 'components/BtnSignUp/BtnSignUp';

export default function UsersList({ allUsers }) {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>Our cheerful users</h2>
        <p className={s.text}>The best specialists are shown below</p>
      </div>

      <ul className={s.users_list}>
        <UsersItem allUsers={allUsers} />
      </ul>

      <BtnSignUp />
    </section>
  );
}
