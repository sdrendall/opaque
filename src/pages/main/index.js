import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Logo from '../../aesthetic/logo'
import UserTag from '../../users/userTag'
import Profile from '../../users/profile'
import Logout from '../../users/logout'
import EditProfileModal from '../../modals/editProfile'
import Footer from '../../aesthetic/footer'

import './styles.scss'

/* props
 *  user: User
 *  updateUser: () => undefined
 */

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayProfileModal: false,
        }
        this.openProfileEditor = this.openProfileEditor.bind(this)
    }

    openProfileEditor() {
        this.setState({
            displayProfileModal: true
        })
    }

    render() {
        const { user, updateUser } = this.props
        return (
            <div className="opaque-page-main">
                <header>
                    <Logo />
                    <UserTag 
                        user={user}
                        openProfileEditor={this.openProfileEditor}
                    />
                    <Logout updateUser={updateUser} />
                </header>

                <BrowserRouter>
                    <section>
                        <Route
                            path="/"
                            render={() => (
                                <Profile
                                    user={user}
                                    openProfileEditor={this.openProfileEditor}
                                />
                            )}
                        />
                    </section>
                </BrowserRouter>

                <Footer />

                { this.state.displayProfileModal &&
                    <EditProfileModal 
                    user={user}
                    updateUser={updateUser}
                    close={() => this.setState({
                        displayProfileModal:false
                    })}
                    />
                }
            </div>
        )
    }
}
