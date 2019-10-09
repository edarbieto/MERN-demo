import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateExercise extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(
        res => {
          if (res.data.length > 0) {
            this.setState({
              users: res.data.map(user => user.username),
              username: res.data[1].username
            })
          }
        }
      )
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: Number(e.target.value)
    })
    e.target.value = Number(e.target.value)
  }

  onKeyDownDuration(e) {
    if (isNaN(Number(e.target.value + e.key))) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: Number(this.state.duration),
      date: this.state.date
    }

    //console.log(exercise)

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data))

    window.location = '/'
  }

  render() {
    return (
      <div>
        <h3>Create new exercise log</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              defaultValue={this.state.username}
              onChange={this.onChangeUsername.bind(this)}>
              {
                this.state.users.map(
                  user => {
                    return (
                      <option key={user} value={user}>
                        {user}
                      </option>
                    )
                  }
                )
              }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              defaultValue={this.state.description}
              onChange={this.onChangeDescription.bind(this)} />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input type="text"
              className="form-control"
              defaultValue={this.state.duration}
              onChange={this.onChangeDuration.bind(this)}
              onKeyDown={this.onKeyDownDuration.bind(this)} />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate.bind(this)} />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="CREATE EXERCISE LOG" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
