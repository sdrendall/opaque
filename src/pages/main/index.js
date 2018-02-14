import React from 'react'
import { Route, Link } from 'react-router-dom'

import Logo from '../../aesthetic/logo'
import UserTag from '../../users/userTag'
import UserProfile from '../../users/userProfile'
import Profile from '../../users/profile'
import FriendDisplay from '../../friends/friendDisplay'
import Logout from '../../users/logout'
import EditProfileModal from '../../modals/editProfile'
import Footer from '../../aesthetic/footer'
import ActiveUserList from '../../users/activeUserList'

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
                        clickHandler={this.openProfileEditor}
                    />
                    <Logout updateUser={updateUser} />
                </header>

                <section>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <UserProfile
                                user={user}
                                openProfileEditor={this.openProfileEditor}
                            />
                        )}
                    />
                    <Route
                        path="/user/:id"
                        render={(_props) => (
                            <Profile
                                user={user}
                                targetId={_props.match.params.id}
                            />
                        )}
                    />

                    <FriendDisplay />
                </section>

                <ActiveUserList />

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
