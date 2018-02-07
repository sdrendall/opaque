import React from 'react'
import _axios from '../network/axios'

import PPic from './profilePic'
import FriendButton from '../ui/friendButton'
import './profileStyles.scss'

/* props
 *  user: User
 *  targetId: User
 */

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            targetUser: null
        }
    }

    componentDidMount() {
        _axios
            .get(`/portal/user/${this.props.targetId}`)
            .then(data => {
                if (data) {
                    console.log(data)
                    this.setState({
                        targetUser: data.user,
                        loading: false
                    })
                } else {
                    alert(`failed to load data for user with user id ${this.props.targetId}`)
                }
            })
    }

    render() {
        const { user } = this.props
        const { loading, targetUser } = this.state
        if (loading) {
            return null
        }

        return (
            <div className="opaque-profile">
                <PPic user={targetUser} />
                <h1>{targetUser.username}</h1>
                <div className="bio">
                    <p>
                        { targetUser.bio }
                    </p>
                </div>
                <FriendButton
                    user={user}
                    targetUser={targetUser}
                />
            </div>
        )
    }
}
