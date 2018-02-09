import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import _axios from './network/axios'

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
            user: null,
            loading: true
        }
        this.updateUser = this.updateUser.bind(this)
    }

    componentDidMount() {
        _axios
            .get('/portal/user')
            .then(data => { 
                this.setState({ loading: false })
                this.updateUser(data.user) 
                console.log(data.user)
            })
            .catch(error => console.log(error))
    }

    updateUser(newUser) {
        this.setState({
            user: newUser
        })
    }

    render() {
        if (this.state.loading) {
            return null // dont render until we have user data
        }

        const user = this.state.user
        return ( 
            <div className="opaque-app"> 
                { user ? (
                    <BrowserRouter>
                        <MainPage user={user} updateUser={this.updateUser} />
                    </BrowserRouter>
                ) : (
                    <LoginPage updateUser={this.updateUser} /> 
                ) } 
            </div>
        )
    }
}
