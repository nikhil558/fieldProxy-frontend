import {Component} from 'react'
import './index.css'

class Requests extends Component {
  state = {
    showButtons: true,
  }

  acceptBtn = () => {
    this.setState({showButtons: false})
  }

  render() {
    const {showButtons} = this.state
    return (
      <div className="each-request-container">
        <div>
          <p className="name-field">Name</p>
          <p className="date-field">Date:</p>
          <p className="date-field">Time:</p>
        </div>
        {showButtons ? (
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
