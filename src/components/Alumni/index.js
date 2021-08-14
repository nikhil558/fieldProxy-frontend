import {Component} from 'react'
import Requests from '../Requests'
import './index.css'

class Alumni extends Component {
  state = {
    allAppointments: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const api = 'https://field-proxy-server.herokuapp.com/appointments'
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)
    const fetchedData = await response.json()
    const responseObj = fetchedData.map(each => ({
      id: each.number,
      title: each.name,
      date: each.date,
      time: each.time,
      isStarred: each.stared,
      acceptance: each.acceptance,
    }))
    this.setState({allAppointments: responseObj})
  }

  reqBtnClicks = () => {
    this.getData()
  }

  render() {
    const {allAppointments} = this.state
    return (
      <>
        <h1 className="appointments"> Appointments</h1>
        <div className="bg-container-alumni">
          {allAppointments.map(each => (
            <Requests
              key={each.id}
              each={each}
              reqBtnClicks={this.reqBtnClicks}
            />
          ))}
        </div>
      </>
    )
  }
}

export default Alumni
