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
    photo: '',
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
      body: this.state,
      headers: { Token: token },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.success) {
          // обработка успешного ответа
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
    // console.log(this.state);
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
        <form className={s.form} onSubmit={this.onSubmit}>
          <input
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
            required
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
            required
          />
          <input
            placeholder="Phone"
            className={s.inputName}
            onChange={this.onChangeState}
            value={this.state.phone}
            type="tel"
            name="phone"
            pattern="^[\+]{0,1}380([0-9]{9})$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <label htmlFor="upload-photo" className={s.input__file_button}>
            <span class={s.input__file_icon_wrapper}>Upload</span>
            <span class="input__file-button-text">Upload your photo</span>
          </label>
          <input
            className={s.visually_hidden}
            id="upload-photo"
            name="photo"
            type="file"
            accept=".jpg, .jpeg"
          />

          <p>Select your position</p>
          <div className={s.container_radio}>
            {positions.map(position => {
              return (
                <label key={position.id}>
                  <input
                    className={s.radio}
                    id={position.id}
                    type="radio"
                    //   checked={gender === Gender.MALE}
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
            <BtnSignUp type="submit">Sign Up</BtnSignUp>\
          </div>
        </form>
      </div>
    );
  }
}
// export default function Form({ positions }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [position, setPosition] = useState('');

//   const handleChange = e => {
//     const { value } = e.target;
//     setPosition(value);
//     console.log(value);
//   };

//   const onSubmit = e => {
//     e.preventDefault();

//     // console.log(e.target);
//     console.log(e.currentTargeti8);
//   };

//   return (
//     <div className={s.container}>
//       <h2 className={s.title}>Register to get a work</h2>
//       <p className={s.text}>
//         Your personal data is stored according to the Privacy Policys
//       </p>

//       {/* onSubmit={this.onSubmit} */}
//       <form className={s.form} onSubmit={onSubmit}>
//         <input
//           placeholder="Your name"
//           className={s.inputName}
//           onChange={setName}
//           value={name}
//           type="text"
//           name="name"
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           required
//         />
//         <input
//           placeholder="Email"
//           className={s.inputName}
//           type="email"
//           id="email"
//           //   pattern=""
//           required
//         />
//         <input
//           placeholder="Phone"
//           className={s.inputName}
//           //   onChange={this.addName}
//           //   value={this.state.number}
//           type="tel"
//           name="number"
//           pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//           required
//         />

//         <p>Select your position</p>
//         {positions.map(position => {
//           return (
//             <label key={position.id}>
//               <input
//                 type="radio"
//                 //   checked={gender === Gender.MALE}
//                 name="position"
//                 value={position.name}
//                 onChange={handleChange}
//               />
//               {position.name}
//             </label>
//           );
//         })}

//         <button className={s.formBtn} type="submit">
//           Add name
//         </button>
//       </form>
//     </div>
//   );
// }
