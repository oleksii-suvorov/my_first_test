import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import '../public/style.css';

const OnActive = {
  color: "#0E9F19",
  marginRight: '184px',
}

const OnInactive = {
  color: "#f22d0d",
  marginRight: '184px',
}

let onCurrentSortingPurch = false;
let onCurrentSortingNames = true;
let switchRows = false;

export default class Users extends React.Component {
  constructor (props) {
    super(props);
    this.SortByName = this.SortByName.bind(this);
    this.SortByPurchaces = this.SortByPurchaces.bind(this);
    this.deleteUsers = this.deleteUsers.bind(this);
    this.state = {
      users: [],
      id: [],
    }
  }

  SortByName (e) {
    const {users} = this.state;
    let newUserListNam =  users;

    if(onCurrentSortingNames) {
      this.setState({
        users: newUserListNam.sort((a, b) => a.name < b.name)
      })
      onCurrentSortingNames = false;
    } else {
        this.setState({
          users: newUserListNam.sort((a, b) => a.name > b.name)
        })
        onCurrentSortingNames = true;
      }
  }

  SortByPurchaces (e) {
    const {users} = this.state;
    let newUserListPurch = users;
      if (onCurrentSortingPurch) {
        this.setState({
          users: newUserListPurch.sort((a, b) => a.n_purchases < b.n_purchases)
        })
        onCurrentSortingPurch = false;
      }
      else {
          this.setState({
            users: newUserListPurch.sort((a, b) => a.n_purchases > b.n_purchases)
          })
          onCurrentSortingPurch = true;
      }
  }

  componentDidMount() {
    // Here I used a bit of jQuery, beacause it is the faster way to implement animation for me now.
    $("#redButton").hide();
    axios.get(`http://localhost:3000/users`)
    .then(res => {
        this.setState({
          users: res.data.sort((a, b) => a.name > b.name)
        })
        $('.cards .row').on("click", function() {
          $("#redButton").show();
          $("#hideSort").hide();
          // $(this).toggleClass('noHover');

          if ($(this).hasClass("act")) {
            $(this).find('.radio').prop("checked", false);
            switchRows = false;
          }
          else if ((!$(this).hasClass("act"))) {
            $(this).find('.radio').prop("checked", true);
            switchRows = true;
          }
          $(this).toggleClass('act');
          if (!$('.cards .row').hasClass("act")) {
            $("#redButton").hide();
            $("#hideSort").show();
          }
        })
        $('.radio').on('click', function() {
          var $radio = $(this);
          if (switchRows === false) {
            $radio.prop('checked', true);
            switchRows = true;
          }
          else {
            $radio.prop('checked', false);
            switchRows = false;
          }
        });
        $("#redButton").on("click", function() {
          $(".row").removeClass('act');
          if ($(".row[class='act']")) {
            $(".cards .row .radio").prop("checked", false);
          }
          $("#hideSort").show();
          $("#redButton").hide();
        })
        // if(!switchRows && (!$(this).hasClass("act"))){
        //   $(".cards .row").mouseenter(function(){
        //     $(this).addClass("hover")
        //   }).mouseleave(function(){
        //     $(this).removeClass("hover")
        //   });
        // }
    })
  }

  getKey(index, event) {
    const id = this.state.id;
    if (event.currentTarget.className === "row act") {
      id.push(index);
      console.log(id);
    }
    else {
      id.pop();
      console.log(id);
    }
  }

  deleteUsers = () => {
    const {newUsers} = this.state;
    let newUserList = newUsers;
    let users = this.state.users;
    let id = this.state.id;
    let usersId = [];
      for(var i = 0; i < users.length; i++){
        usersId.push(users[i]);
      }
    let common = id.filter(x => usersId.includes(x));
    let result = usersId.filter(x => !common.includes(x));
    newUserList = result;
    this.setState({
      users: newUserList
    })
    for (let i = 0; i < id.length;i++){
      console.log(id[i].name + " was deleted from this state");
    }
    // alert("Hi, Denis, please check console. \n There should be shown updating of current array. \n I was not able to update it without mutation, unfortunately. \n");
    console.log(result);
    return false;
  }

  render() {
    return (
      <div className='container' id ="body">
        <div className='row' id= "sort">
          <div className='col-9'></div>
          <div className='col-3'>
            <span id="hideSort">
            Ordina per
            <p className='orderTriggers' onClick = {this.SortByPurchaces}> Aquisti </p>
            <p className='orderTriggers' onClick = {this.SortByName}> Nome</p>
            </span>
            <span>
            <button onClick={this.deleteUsers} type="button" id="redButton" className="btn btn-danger btn-sm">
              ELIMINA SELEZIONATI
            </button>
            </span>
          </div>
        </div>
        <div className='row' id="forButton">
          <div className='col-2'></div>
          <div className='col-2'>Nome</div>
          <div className='col-2'>Aquisti</div>
          <div className='col-2' id="statusDiv">Status</div>
          <div className='col-4'>

          </div>
        </div>
          <div className="cards">
          {this.state.users.map((user, index) => (
            <div key={index} className='row' compare = {user.id} onClick = {this.getKey.bind(this, this.state.users[index])} id = "row">
              <div className='col-1'>
                <input className="radio" type="radio" name = {user.id} data-waschecked="true" id = "radio"></input>
              </div>
              <div className='col-1 p-1'>
                <img src = {user.urlAvatar} alt={`${user.name}'s foto'`} className='rounded-circle' title = {user.name}></img>
              </div>
              <div className='col-2' id='name'>{user.name}</div>
              <div className='col-2'>{user.n_purchases}</div>
              <div className='col-2'>
                <i className="fas fa-circle" style ={ user.status ? OnActive : OnInactive } title = {user.status ? "active" : "inactive" }></i>
              </div>
              <div className='col-1'></div>
              <div className='col-3'>
                <Link to={{ pathname: `/users/${user.id}`, state: { user: user.name} }} type="button" className='btn btn-primary btn-lg'>DETTAGLI</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
