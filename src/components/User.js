import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OnActive = {
  color: "#0E9F19",
  marginRight: '184px',
}

const OnInactive = {
  color: "#f22d0d",
  marginRight: '184px',
}

const p = {
  color: "grey",
  fontSize: "20px"
}
const Img = {
  width: "170px",
  height: "170px",
  margin: "10px 25px 25px 0px",
}
const spanName = {
  fontWeight: "600",
  fontSize: "27px",
}

class User extends React.Component {
  state = {
    id: "",
    name:  "",
    phone: "",
    birthdate: "",
    email: "",
    urlAvatar: "",
    in_purchases: "",
    status: "",
  };

  handleChangePhone = event => {
    this.setState({
      phone: event.target.value
    })
  }
  handleChangeBday = event => {
    this.setState({
      birthdate: event.target.value
    })
  }
  handleChangeEmail = event => {
    this.setState({
      email: event.target.value
    })
  }

  updateUsers = event => {
    let selectedUser = this.state;
    let state = this.state;
    event.preventDefault();
    const user = {
      id: selectedUser.id,
      name: selectedUser.name,
      phone: state.phone,
      birthdate: state.birthdate,
      email: state.email,
      urlAvatar: selectedUser.urlAvatar,
      n_purchases: selectedUser.n_purchases,
      status: selectedUser.status
    }
    axios.put(`http://localhost:3000/users/${selectedUser.id}`, {user} )
      .then(res =>
        console.log(res)
      )

  }

  componentDidMount = async () => {
    const user = this.props.location.state.user;
    const api_call = await fetch (`http://localhost:3000/users?name=${user}`);
    const responce = await api_call.json();
    const { id, name, phone, birthdate, email, urlAvatar, n_purchases, status} = responce[0];
    this.setState({
      id: id,
      name: name,
      phone: phone,
      birthdate: birthdate,
      email: email,
      urlAvatar: urlAvatar,
      in_purchases: n_purchases,
      status: status,
    });
  };

  render() {
    const selectedUser = this.state;
    return (
      <div className="container">
        { this.state.length !== 0 &&
          <div className="container">
          <Header />
          <div className="container col-5 ml-5 pl-5">
            <img src={selectedUser.urlAvatar} alt={selectedUser.name + " photo"} className="rounded-circle" style={Img}></img>
            <span className="name" style={spanName}>{selectedUser.name} </span>
            <span><i className="fas fa-circle" style ={ selectedUser.status ? OnActive : OnInactive } title = {selectedUser.status ? "active" : "inactive" }></i></span>
            <p style={p}>Info</p>
            <form id="modify" onSubmit = {this.updateUsers} className="col-8 pl-0">
              <div className="form-group">
                <label for="exampleInputPhone">Telefono</label>
                <input type="text" onChange = {this.handleChangePhone} className="form-control form-control-sm" id="exampleInputPhone" name="phone" placeholder={selectedUser.phone}></input>
              </div>
              <div className="form-group">
                <label for="exampleInputBirthday">Data di Nascita</label>
                <input type="text" onChange = {this.handleChangeBday} className="form-control form-control-sm" id="exampleInputBirthday" placeholder={selectedUser.birthdate}></input>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input onChange = {this.handleChangeEmail} type="text" className="form-control form-control-sm" id="exampleInputEmail1" placeholder={selectedUser.email}></input>
              </div>
              <button className="btn btn-primary">Salva</button>
            </form>
            <Link to="/users/"><i class="fas fa-arrow-left"></i> Indietro</Link>
          </div>
          </div>
        }
      </div>
    );
    }

}
export default User
