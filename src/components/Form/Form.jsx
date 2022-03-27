import s from './Form.module.css';
import react from 'react';
import BtnSignUp from 'components/BtnSignUp/BtnSignUp';
// import { ReactComponent as backGroundSvg } from '../../svg/Footprint-467x177.svg';

export default class Form extends react.Component {
  state = {
    name: '',
    email: '',
    phone: '',
    position_id: 0,
  };

  appendFormData = () => {
    const { name, email, phone, position_id } = this.state;

    var formData = new FormData();

    var fileField = document.querySelector('input[type="file"]');

    formData.append('name', name);
    formData.set('email', email);
    formData.set('phone', phone);
    formData.set('position_id', position_id);

    formData.append('photo', fileField.files[0]);
    return formData;
  };

  fetchToken = async () => {
    const tok = await fetch(
      'https://frontend-test-assignment-api.abz.agency/api/v1/token'
    );
    const r = await tok.json();

    if (r.success) {
      this.registerUser(r.token);
    }
  };

  registerUser = token => {
    fetch(' https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      body: this.appendFormData(),
      headers: { Token: token },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.success) {
          return this.resetForm();
        } else {
          // обработка ошибок сервера
        }
      })
      .catch(function (error) {
        // обработка сетевых ошибок
      });
  };

  onChangeState = e => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleChange = e => {
    const { id } = e.target;
    this.setState({
      position_id: id,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.fetchToken();
  };

  validFileType = file => {
    var fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png'];

    for (var i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        return true;
      }
    }

    return false;
  };

  updateImageDisplay = () => {
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
        if (this.validFileType(curFiles[i])) {
          para.textContent =
            curFiles[i].name +
            ' ' +
            this.returnFileSize(curFiles[i].size) +
            '.';
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

  returnFileSize = number => {
    if (number < 1024) {
      return number + 'bytes';
    } else if (number > 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576) {
      return (number / 1048576).toFixed(1) + 'MB';
    }
  };

  componentDidMount() {
    // console.log('componentDidMount');
    window.addEventListener('change', this.updateImageDisplay);
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
    window.removeEventListener('change', this.updateImageDisplay);
  }

  resetForm = () => {
    const form = document.getElementById('form');

    this.setState({
      name: '',
      email: '',
      phone: '',
      position_id: 0,
    });

    form.reset();
  };

  render() {
    const { positions } = this.props;

    return (
      <div className={s.container} id="register">
        <h2 className={s.title}>Register to get a work</h2>
        <p className={s.text}>
          Your personal data is stored according to the Privacy Policys
        </p>

        {/* onSubmit={this.onSubmit} */}
        <form className={s.form} onSubmit={this.onSubmit} id="form">
          <input
            id="name"
            placeholder="Your name"
            className={s.inputName}
            onChange={this.onChangeState}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            minLength={2}
            maxLength="60"
            // required
          />
          <input
            placeholder="Email"
            className={s.inputName}
            type="email"
            id="email"
            onChange={this.onChangeState}
            value={this.state.email}
            name="email"
            // pattern=""
            minLength={2}
            maxLength="100"
            // required
          />
          <input
            placeholder="Phone"
            className={s.inputName}
            onChange={this.onChangeState}
            value={this.state.phone}
            type="tel"
            name="phone"
            id="phone"
            pattern="^[\+]{0,1}380([0-9]{9})$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            // required
          />
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
            // required
          />
          <div className="preview">
            {/* <p>No files currently selected for upload</p> */}
          </div>

          <p>Select your position</p>
          <div className={s.container_radio}>
            {positions.map(position => {
              return (
                <label key={position.id}>
                  <input
                    className={s.radio}
                    id={position.id}
                    type="radio"
                    name="position"
                    value={position.name}
                    onChange={this.handleChange}
                  />
                  {position.name}
                </label>
              );
            })}
          </div>
          <div className={s.btn}>
            <BtnSignUp type="submit">
              {/* <input type="reset"></input> */}
              Sign Up
            </BtnSignUp>
            \
          </div>
        </form>
      </div>
    );
  }
}
