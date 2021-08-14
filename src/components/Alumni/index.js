import {Component} from 'react'
import Requests from '../Requests'
import './index.css'

class Alumni extends Component {
  render() {
    return (
      <>
        <h1 className="appointments"> Appointments</h1>
        <div className="bg-container-alumni">
          <Requests />
        </div>
      </>
    )
  }
}

export default Alumni
