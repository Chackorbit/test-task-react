import s from './UsersItem.module.css';

export default function UsersItem({ allUsers }) {
  return allUsers.map(user => {
    const { id, photo, name, position, email, phone } = user;

    return (
      <li key={id} className={s.user_item}>
        <img className={s.img} src={photo} alt="photo" width={70} height={70} />
        <p className={s.name}>{name}</p>
        <p className={s.about}>{position} </p>
        <p className={s.email}>
          <a className={s.about} href={`mailto:${email}`}>
            {email}
          </a>
        </p>
        <p>
          <a className={s.about} href={`tel:${phone}`}>
            {phone}
          </a>
        </p>
      </li>
    );
  });
}
