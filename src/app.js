import React from 'react'

import LoginPage from './pages/login'
import MainPage from './pages/main'
import './scss/global.scss'

/* props {
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

    updateUser(newUser) {
        this.setState({
            user: newUser
        })
    }

    render() {
        const isLoggedIn = this.state.user
        return ( 
            <div className="opaque-app"> 
                {isLoggedIn ? (
                    <MainPage />
                ) : (
                    <LoginPage 
                        updateUser={this.updateUser}
                    /> 
                ) } 
            </div>
        )
    }
}
