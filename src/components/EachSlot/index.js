import {Component} from 'react'
import './index.css'

class EachSlot extends Component {
  state = {
    clicked: false,
  }

  slotClicked = () => {
    const {slotTiming} = this.props
    const {each} = this.props
    const {time} = each
    slotTiming(time)
    this.setState({clicked: true})
  }

  render() {
    const {each, styledSlot} = this.props
    const {slot, time} = each
    const {clicked} = this.state
    const styling = clicked ? styledSlot : ''
    return (
      <li
        className={`each-slot-container ${styling}`}
        onClick={this.slotClicked}
      >
        <p className="para1">{slot}</p>
        <p className="para2">{time}</p>
      </li>
    )
  }
}

export default EachSlot
