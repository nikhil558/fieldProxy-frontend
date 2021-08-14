import {Component} from 'react'
import './index.css'

class Requests extends Component {
  updateAcceptance = async data => {
    const url = 'https://field-proxy-server.herokuapp.com/updateAcceptance'
    const options = {
      headers: {'Content-Type': 'application/json'},
      method: 'PUT',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    console.log(response)
  }

  cancelApplication = async data => {
    const url = `https://field-proxy-server.herokuapp.com/delete/${data}`
    const options = {
      method: 'DELETE',
    }
    const response = await fetch(url, options)
    console.log(response)
  }

  declineBtn = () => {
    const {each, reqBtnClicks} = this.props
    this.cancelApplication(each.id)
    reqBtnClicks()
  }

  acceptBtn = () => {
    const {each, reqBtnClicks} = this.props
    const updateAcc = {
      id: each.id,
      acceptance: each.acceptance,
    }
    this.updateAcceptance(updateAcc)
    reqBtnClicks()
  }

  render() {
    const {each} = this.props
    const {date, time, title, acceptance} = each

    return (
      <div className="each-request-container">
        <div>
          <p className="name-field">{title}</p>
          <p className="date-field">{`Date:${date}`}</p>
          <p className="date-field">{`Time:${time}`}</p>
        </div>
        {acceptance ? (
          <div className="buttonsContainer">
            <button type="button" className="button1" onClick={this.acceptBtn}>
              Accept
            </button>
            <button type="button" className="button2">
              Decline
            </button>
          </div>
        ) : (
          <div className="buttonsContainer">
            <p className="accepted-para">Accepted</p>
          </div>
        )}
      </div>
    )
  }
}

export default Requests
