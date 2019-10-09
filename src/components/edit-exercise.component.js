import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'

export default class EditExercise extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      description: '',
      duration: '',
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
      .then(
        res => {
          this.setState({
            username: res.data.username,
            description: res.data.description,
            duration: res.data.duration,
            date: Date.parse(res.data.date),
          })
        }
      )

    axios.get('http://localhost:5000/users')
      .then(
        res => {
          if (res.data.length > 0) {
            this.setState({
              users: res.data.map(user => user.username)
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
      duration: e.target.value
    })
    e.target.value = Number(e.target.value)
  }

  onKeyDownDuration(e) {
    if (isNaN(Number(e.target.value + e.key)) && e.keyCode !== 8) {
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

    axios.post(`http://localhost:5000/exercises/${this.props.match.params.id}`, exercise)
      .then(res => console.log(res.data))

    window.location = '/'
  }

  render() {
    return (
      <div>
        <h3>Edit exercise log</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
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
            <input type="submit" value="SAVE EXERCISE LOG" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
