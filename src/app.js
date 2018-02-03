import React from 'react'
import axios from './network/axios'

import LoginPage from './pages/login'
import MainPage from './pages/main'
import './scss/global.scss'

/* state {
 *      user: currentUser || undefined
 *  }
 */

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        this.updateUser = this.updateUser.bind(this)
    }

    componentDidMount() {
        axios
            .get('/portal/user')
            .then(({ data }) => { 
                this.updateUser(data.user) 
                console.log(data.user)
            })
    }

    updateUser(newUser) {
        this.setState({
            user: newUser
        })
    }

    render() {
        const user = this.state.user
        return ( 
            <div className="opaque-app"> 
                { user ? (
                    <MainPage user={user} updateUser={this.updateUser} />
                ) : (
                    <LoginPage updateUser={this.updateUser} /> 
                ) } 
            </div>
        )
    }
}
