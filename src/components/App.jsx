import { useState, useEffect } from 'react';
import Header from './Header/Header';
import FirstBlock from './FirstBlock/FirstBlock';
import SecondBlock from './SecondBlock/SecondBlock';
import UsersList from './UsersList/UsersList';

export const App = () => {
  const [allUsers, setAllUsers] = useState([]);

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
    fetch(
      'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=5'
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data.users);
        if (data.success) {
          setAllUsers(data.users);
          return; // ответ об успешной обработке
        } else {
          // обработка ошибок сервера
        }
      });
  };

  useEffect(() => {
    fetchToken();
    fetchUsers();
  }, []);

  console.log(allUsers);
  return (
    <div>
      <Header />

      <FirstBlock />

      <SecondBlock />

      <UsersList allUsers={allUsers} />
    </div>
  );
};
