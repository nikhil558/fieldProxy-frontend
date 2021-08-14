import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import EachSlot from '../EachSlot'
import './index.css'

const slots = [
  {
    slot: 'SLOT1',
    time: '1pm-2pm',
  },
  {
    slot: 'SLOT2',
    time: '4pm-5pm',
  },
  {
    slot: 'SLOT1',
    time: '6pm-7pm',
  },
]

class Students extends Component {
  state = {
    appointmentsList: [],
    dateInput: '',
    isFilterActive: false,
    slotTime: '',
    styledSlot: '',
    errMsg: '',
  }

  componentDidMount() {
    this.getDataFromDataBase()
  }

  getDataFromDataBase = async () => {
    const {name} = this.props
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
    const filterObj = responseObj.filter(each => each.title === name)
    console.log(filterObj)
    this.setState({appointmentsList: filterObj})
  }

  updateDataFromDatabase = async data => {
    const url = 'https://field-proxy-server.herokuapp.com/updateStar'
    const options = {
      headers: {'Content-Type': 'application/json'},
      method: 'PUT',
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)
    console.log(response)
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          const updateStar = {
            id: eachAppointment.id,
            isStared: !eachAppointment.isStarred,
          }
          this.updateDataFromDatabase(updateStar)
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  slotTiming = value => {
    this.setState({slotTime: value, styledSlot: 'slot-click-style'})
  }

  addDataToDatabase = async data => {
    const url = 'https://field-proxy-server.herokuapp.com/add'
    const options = {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)
    console.log(response)
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {slotTime, dateInput, appointmentsList} = this.state
    const {name} = this.props

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: name,
      date: formattedDate,
      isStarred: false,
      time: slotTime,
      acceptance: false,
    }
    if (appointmentsList.length <= 2) {
      this.addDataToDatabase(newAppointment)
      this.getDataFromDataBase()
      this.setState({
        dateInput: '',
        styledSlot: '',
      })
    } else {
      this.setState({errMsg: 'You reach the application limit'})
    }
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {dateInput, isFilterActive, styledSlot, errMsg} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <ul className="slots-container">
                  {slots.map(each => (
                    <EachSlot
                      each={each}
                      slotTiming={this.slotTiming}
                      styledSlot={styledSlot}
                    />
                  ))}
                </ul>
                <button type="submit" className="add-button">
                  Add
                </button>
                <p>{errMsg}</p>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onClickFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Students
