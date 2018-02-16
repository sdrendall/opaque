import React from 'react'
import { Route, Link } from 'react-router-dom'

import Logo from '../../aesthetic/logo'
import UserTag from '../../users/userTag'
import UserProfile from '../../users/userProfile'
import Profile from '../../users/profile'
import FriendDisplay from '../../friends/friendDisplay'
import Logout from '../../users/logout'
import EditProfileModal from '../../modals/editProfile'
import GlobalChatModal from '../../modals/globalChat'
import Footer from '../../aesthetic/footer'
import ClickableText from '../../ui/clickableText'

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
            displayGlobalChatModal: false,
        }
        this.openProfileEditor = this.openProfileEditor.bind(this)
        this.openGlobalChat = this.openGlobalChat.bind(this)
    }

    openProfileEditor() {
        this.setState({
            displayProfileModal: true
        })
    }

    openGlobalChat() {
        this.setState({
            displayGlobalChatModal: true
        })
    }

    render() {
        const { user, updateUser } = this.props
        return (
            <div className="opaque-page-main">
                <header>
                    <Logo />
                    <ClickableText 
                        className="opaque-globalchat-toggle"
                        onClick={this.openGlobalChat}
                        text={'global'} 
                    />
                    <Link className="opaque-usertag-link" to='/' >
                        <UserTag 
                            user={user} 
                            clickHandler={ x => x }  
                        />
                    </Link>
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

                <Footer />

                { this.state.displayProfileModal &&
                    <EditProfileModal 
                        user={user}
                        updateUser={updateUser}
                        close={() => this.setState({
                            displayProfileModal: false
                        })}
                    />
                }

                { this.state.displayGlobalChatModal &&
                    <GlobalChatModal
                        user={user}
                        close={() => this.setState({
                            displayGlobalChatModal: false
                        })}
                    />
                }
            </div>
        )
    }
}
