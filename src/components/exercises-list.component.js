import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={'/edit/' + props.exercise._id}>Editar</Link> | <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>Eliminar</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {

  constructor(props) {
    super(props)

    this.state = { exercises: [] }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises')
      .then(
        res => {
          this.setState({
            exercises: res.data
          })
        }
      )
  }

  deleteExercise(id) {
    axios.delete(`http://localhost:5000/exercises/${id}`)
      .then(res => console.log(res.data))

    this.setState({
      exercises: this.state.exercises.filter(i => i._id !== id)
    })
  }

  render() {
    return (
      <div>
        <h3>Logged exercises</h3>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.exercises.map(
                exercise => {
                  return (
                    <Exercise exercise={exercise} deleteExercise={this.deleteExercise.bind(this)}></Exercise>
                  )
                }
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}
