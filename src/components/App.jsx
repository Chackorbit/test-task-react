import s from './App.module.css';
import React, { Suspense } from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

const Header = React.lazy(() => import('./Header/Header'));
const FirstBlock = React.lazy(() => import('./FirstBlock/FirstBlock'));
const UsersList = React.lazy(() => import('./UsersList/UsersList'));
const Form = React.lazy(() => import('./Form/Form'));

export const App = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [positions, setPositions] = useState([]);

  const fetchUsers = () => {
    const BASE_URL =
      'https://frontend-test-assignment-api.abz.agency/api/v1/users';
    const meta = new URLSearchParams({
      page: page,
      count: 6,
    });
    const url = `${BASE_URL}?${meta}`;
    if (addUser) {
      setPage(1);
      setAddUser(false);
      setAllUsers([]);
    }
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data.users);
        if (data.links.next_url === null) {
          setShowBtnMore(true);
        }
        if (data.success) {
          setAllUsers(state => {
            if (page === 1 || data.length === 0) {
              return data.users;
            }
            if (page > 1) {
              return [...state, ...data.users];
            }
          });
          // ответ об успешной обработке
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchPosition = async () => {
    const { data } = await axios.get(
      'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
    );
    setPositions(data.positions);
  };

  const showMore = () => {
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

  useEffect(() => {
    fetchPosition();
  }, []);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, addUser]);

  return (
    <div className={s.body}>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Header />

        <FirstBlock />

        <UsersList
          showBtnMore={showBtnMore}
          showMore={showMore}
          allUsers={allUsers}
          addUser={addUser}
        />

        <Form positions={positions} setAddUser={setAddUser} />
      </Suspense>
    </div>
  );
};
