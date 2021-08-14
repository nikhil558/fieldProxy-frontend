import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import Students from '../Students'
import Alumni from '../Alumni'
import './index.css'

class Home extends Component {
  render() {
    const checkCookie = Cookies.get('jwt_token')
    if (checkCookie === undefined) {
      return <Redirect to="/login" />
    }
    const {location} = this.props
    console.log(location)
    const {state} = location
    const {name} = state
    return (
      <>
        <Header />
        <div>{name !== 'alumni' ? <Students name={name} /> : <Alumni />}</div>
      </>
    )
  }
}

export default Home
