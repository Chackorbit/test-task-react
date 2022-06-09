import s from './Form.module.css';
import { useEffect } from 'react';
import BtnSignUp from 'components/BtnSignUp/BtnSignUp';
import axios from 'axios';
import { useFormik } from 'formik';

axios.defaults.baseURL =
  'https://frontend-test-assignment-api.abz.agency/api/v1';

export default function Form({ positions, setAddUser }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      position_id: 0,
      photo: '',
    },

    onSubmit: values => {
      fetchToken();
    },
  });

  const fetchToken = async () => {
    try {
      const { data } = await axios.get('/token');
      if (data.success) {
        registerUser(data.token);
      }
    } catch (error) {}
  };

  const appendFormData = () => {
    const { name, email, phone, position_id, photo } = formik.values;

    var formData = new FormData();

    formData.append('name', name);
    formData.set('email', email);
    formData.set('phone', phone);
    formData.set('position_id', position_id);
    formData.append('photo', photo);

    return formData;
  };

  const registerUser = async token => {
    fetch(' https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      body: appendFormData(),
      headers: { Token: token },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        if (data.success) {
          setAddUser(state => !state);
          return resetForm();
        }
      })
      .catch(function (error) {
        // обработка сетевых ошибок
      });
  };

  const validFileType = file => {
    var fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png'];

    for (var i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        return true;
      }
    }

    return false;
  };

  const updateImageDisplay = () => {
    var input = document.querySelector('#upload-photo');
    var preview = document.querySelector('.preview');

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    var curFiles = input.files;

    if (curFiles.length === 0) {
      // var para = document.createElement('p');
      // para.textContent = 'No files currently selected for upload';
      // preview.appendChild(para);
    } else {
      var list = document.createElement('ul');
      list.classList.add('chose_img');

      preview.appendChild(list);
      for (var i = 0; i < curFiles.length; i++) {
        var listItem = document.createElement('li');
        // eslint-disable-next-line no-redeclare
        var para = document.createElement('p');
        if (validFileType(curFiles[i])) {
          para.textContent =
            curFiles[i].name + ' ' + returnFileSize(curFiles[i].size) + '.';
          var image = document.createElement('img');
          image.src = window.URL.createObjectURL(curFiles[i]);

          listItem.appendChild(image);
          listItem.appendChild(para);
        } else {
          para.textContent =
            'File name ' +
            curFiles[i].name +
            ': Not a valid file type. Update your selection.';
          listItem.appendChild(para);
        }

        list.appendChild(listItem);
      }
    }
  };

  const returnFileSize = number => {
    if (number < 1024) {
      return number + 'bytes';
    } else if (number > 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576) {
      return (number / 1048576).toFixed(1) + 'MB';
    }
  };

  const uploadAvatar = event => {
    formik.values.photo = event.currentTarget.files[0];
  };

  const resetForm = () => {
    const form = document.getElementById('form');
    formik.resetForm({
      name: '',
      email: '',
      phone: '',
      position_id: 0,
      photo: '',
    });
    form.reset();
  };

  useEffect(() => {
    window.addEventListener('change', updateImageDisplay);

    return () => {
      window.removeEventListener('change', updateImageDisplay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.container} id="register">
      <h2 className={s.title}>Working with POST request</h2>

      <form className={s.form} onSubmit={formik.handleSubmit} id="form">
        <label className={s.label}>
          <input
            id="name"
            placeholder="Your name"
            className={s.inputName}
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            minLength={2}
            maxLength="60"
            required
          />
        </label>

        <label className={s.label}>
          <input
            placeholder="Email"
            className={s.inputName}
            type="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            // pattern=""
            minLength={2}
            maxLength="100"
            required
          />
        </label>

        <label className={s.label}>
          <input
            placeholder="Phone"
            className={s.inputName}
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="phone"
            pattern="^[\+]{0,1}380([0-9]{9})$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          +38 (XXX) XXX - XX - XX
        </label>

        <p>Select your position</p>
        <div className={s.container_radio}>
          {positions?.map(position => {
            return (
              <label key={position.id}>
                <input
                  className={s.radio}
                  id={position.id}
                  type="radio"
                  name="position_id"
                  value={position.id}
                  onChange={formik.handleChange}
                />
                {position.name}
              </label>
            );
          })}
        </div>

        <label htmlFor="upload-photo" className={s.input__file_button}>
          <span className={s.input__file_icon_wrapper}>Upload</span>
          <span className="input__file-button-text">Upload your photo</span>
        </label>
        <input
          className={s.visually_hidden}
          id="upload-photo"
          name="photo"
          type="file"
          accept=".jpg, .jpeg"
          onChange={uploadAvatar}
          required
        />
        <div className="preview"></div>

        <div className={s.btn}>
          <BtnSignUp type="submit" isSubmitting={formik.isSubmitting}>
            {formik.isSubmitting ? 'Loading...' : 'Sign Up'}
          </BtnSignUp>
          \
        </div>
      </form>
    </div>
  );
}
