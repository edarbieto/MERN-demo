import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const user = {
      username: this.state.username
    }

    //console.log(user)

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data))

    //window.location = '/'
  }

  render() {
    return (
      <div>
        <h3>Create new user</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label>Username: </label>
            <input type="text"
              required
              className="form-control"
              defaultValue={this.state.username}
              onChange={this.onChangeUsername.bind(this)} />
          </div>
          <div className="form-group">
            <input type="submit" value="CREATE USER" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
