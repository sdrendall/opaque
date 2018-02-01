import React from 'react'

import Logo from '../../aesthetic/logo'
import ProfilePic from '../../users/profilePic'
import EditProfileModal from '../../modals/editProfile'

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
    }

    render() {
        const { user, updateUser } = this.props
        return (
            <div className="opaque-page-main">
                <Logo />
                <ProfilePic 
                    user={user}
                    openProfileEditor={() => this.setState({
                        displayProfileModal: true
                    })}
                />
                <EditProfileModal 
                    user={user}
                    updateUser={updateUser}
                />
            </div>
        )
    }
}
