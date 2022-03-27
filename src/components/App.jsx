import s from './App.module.css';
import { useState, useEffect } from 'react';
import Header from './Header/Header';
import FirstBlock from './FirstBlock/FirstBlock';
import SecondBlock from './SecondBlock/SecondBlock';
import UsersList from './UsersList/UsersList';
import Form from './Form/Form';
import Footer from './Footer/Footer';
import MobileMenu from './Header/MobileMenu/MobileMenu';

export const App = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [positions, setPositions] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

  // eslint-disable-next-line no-unused-vars

  const fetchUsers = () => {
    const BASE_URL =
      'https://frontend-test-assignment-api.abz.agency/api/v1/users';
    const meta = new URLSearchParams({
      page: page,
      count: 6,
    });
    const url = `${BASE_URL}?${meta}`;

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data.users);
        if (data.success) {
          setAllUsers(state => {
            if (state.length === 0) {
              return data.users;
            }
            if (state.length > 0) {
              return [...state, ...data.users];
            }
          });
          // ответ об успешной обработке
        } else {
          // обработка ошибок сервера
        }
      });
  };

  const fetchPosition = () => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setPositions(data.positions); // ответ об успешном завершении процесса }) ```
      });
  };

  const showMore = () => {
    // setAllUsers(state => [...state, ...dataUsers]);
    setPage(state => state + 1);
  };

  document.querySelectorAll('a[href^="#"').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      let href = this.getAttribute('href').substring(1);

      const scrollTarget = document.getElementById(href);

      // const topOffset = document.querySelector('.scrollto').offsetHeight;
      const topOffset = 0; // если не нужен отступ сверху
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth',
      });
    });
  });

  const onOpenMenu = e => {
    setOpenMenu(state => {
      if (state === true) {
        return false;
      } else if (state === false) {
        return true;
      }
    });
  };

  useEffect(() => {
    fetchPosition();
  }, []);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={s.body}>
      <Header openMenu={onOpenMenu} />
      {openMenu && <MobileMenu onOpenMenu={onOpenMenu} />}

      <FirstBlock />

      <SecondBlock />

      <UsersList showMore={showMore} allUsers={allUsers} />

      <Form positions={positions} />

      <Footer />
    </div>
  );
};
