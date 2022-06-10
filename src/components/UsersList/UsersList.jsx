import s from './UsersList.module.css';
import UsersItem from './UsersItem/UsersItem';
import BtnSignUp from 'components/BtnSignUp/BtnSignUp';

export default function UsersList({ allUsers, showMore, showBtnMore }) {
  return (
    <section className={s.section} id="users">
      <div className={s.container}>
        <h2 className={s.title}>Working with GET request</h2>
      </div>

      <ul className={s.users_list}>
        <UsersItem allUsers={allUsers} />
      </ul>

      {!showBtnMore && (
        <div className={s.positionBtn}>
          <BtnSignUp showMore={showMore}>Show more</BtnSignUp>
        </div>
      )}
    </section>
  );
}
