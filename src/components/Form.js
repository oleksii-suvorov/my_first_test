import React from 'react';
import axios from 'axios';

const popupMsg = 'Hello Denis! "\n" All the changes were added successfully to the local API json-server. "\n" Please, make sure you are using port 3000 for requests (GET, PUT). "\n" Now you can simply check out the form\'s placeholders or your json file';
const brLine = "'\n'";
const newBdate = "New bday date is: ";
const newEmail = "New email now is: ";
const bye = "Thank you. Please press OK to refresh the page";

class Form extends React.Component {
  constructor(props) {
      super(props);
    this.state = {
      phone: "",
      birthdate: "",
      email: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault();
    JSON.stringify(this.state)
    console.log(this.state)
    const {id, name, urlAvatar, n_purchases, status} = this.props.selectedUser

    axios.put(`http://localhost:3000/users/${id}`, {
      id, name, phone: this.state.phone, birthdate: this.state.birthdate, email: this.state.email, urlAvatar, n_purchases, status
    }).then(res => {
      if(res){
        const newState = this.state;
        alert(popupMsg + brLine + `${name}'s new phone is: ` + newState.phone + brLine + newBdate + newState.birthdate + brLine + newEmail + newState.email + brLine + bye)
      window.location.reload()
    } else {
      alert("Something wrong =(")
    }
    })
  }
  render(){
    const props = this.props.selectedUser;
    return(
      <form onSubmit={this.handleSubmit} action ="/users" id="modify" className="col-8 pl-0">
        <div className="form-group">
          <label for="exampleInputPhone">
            Telefono
            <input onChange={this.handleChange} type="text" className="form-control form-control-sm" id="exampleInputPhone" name="phone" placeholder = {props.phone} />
          </label>
        </div>
        <div className="form-group">
          <label for="exampleInputBirthday">
            Data di Nascita
            <input onChange={this.handleChange} type="text" className="form-control form-control-sm" id="exampleInputBirthday" name="birthdate" placeholder = {props.birthdate} />
          </label>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">
            Email
            <input onChange={this.handleChange} type="text" className="form-control form-control-sm" id="exampleInputEmail1" name="email" placeholder={props.email}/>
          </label>
        </div>
        <button onClick = {this.redirect} type="submit" className="btn btn-primary">Salva</button>
      </form>
    )
  }
}
export default Form
