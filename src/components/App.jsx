import { useState, useEffect } from 'react';
import Header from './Header/Header';
import FirstBlock from './FirstBlock/FirstBlock';
import SecondBlock from './SecondBlock/SecondBlock';
import UsersList from './UsersList/UsersList';

export const App = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchToken = () => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log('data: ', data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchUsers = () => {
    const BASE_URL =
      'https://frontend-test-assignment-api.abz.agency/api/v1/users';
    const meta = new URLSearchParams({
      page: page,
      count: 6,
    });
    const url = `${BASE_URL}?${meta}`;
    console.log(page);

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

  const showMore = dataUsers => {
    // setAllUsers(state => [...state, ...dataUsers]);
    setPage(state => state + 1);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  console.log(allUsers);
  return (
    <div>
      <Header />

      <FirstBlock />

      <SecondBlock />

      <UsersList showMore={showMore} allUsers={allUsers} />
    </div>
  );
};
