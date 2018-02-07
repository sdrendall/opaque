import React from 'react'
import _axios from '../../network/axios'

import './styles.scss'

/* props
 *  user: User
 *  targetUser: User
 */

/* friendship statues:
 *  1: requested
 *  2: accepted
 *  3: rejected
 *  4: cancelled
 *  5: terminated
 *  6: not friends
 *
 *  *: awaiting response - created here
 */

const statusToText = {
    requested: 'cancel request',
    accepted: 'unfriend',
    rejected: 'add friend',
    cancelled: 'add friend',
    terminated: 'add friend',
    'not friends': 'add friend',
    'awaiting response': 'awaiting response'
}

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'not friends',
            display: false
        }
        this.handleFriendshipData = this.handleFriendshipData.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.checkFriendship = this.checkFriendship.bind(this)
        this.requestFriendship = this.requestFriendship.bind(this)
        this.rejectRequest = this.rejectRequest.bind(this)
        this.cancelRequest = this.cancelRequest.bind(this)
        this.terminateFriendship = this.terminateFriendship.bind(this)
    }

    componentDidMount() {
        _axios
            .get(`/friends/check/${this.props.targetUser.id}`)
            .then(this.handleFriendshipData)
            .catch(error => console.log(error))
    }

    handleFriendshipData(data) {
        const status = data.status == 'requested' && data.user2_id == this.props.user.id ? (
            'awaiting response'
        ) : (
            data.status
        )
        if (data) {
            this.setState({ 
                status,
                display: true
            })
        } else {
            this.setState({ display: false })
        }
    }

    checkFriendship() {
        _axios
            .get(`/friends/check/${this.props.targetUser.id}`)
            .then(this.handleFriendshipData)
    }

    requestFriendship() {
        _axios
            .get(`/friends/request/${this.props.targetUser.id}`)
            .then(this.handleFriendshipData)
    }

    rejectRequest() {
        _axios
            .get(`/friends/reject/${this.props.targetUser.id}`)
            .then(this.handleFriendshipData)
    }

    cancelRequest() {
        _axios
            .get(`/friends/cancel/${this.props.targetUser.id}`)
            .then(this.handleFriendshipData)
    }

    terminateFriendship() {
        _axios
            .get(`/friends/terminate/${this.props.targetUser.id}`)
            .then(this.handleFriendshipData)
    }

    handleButtonClick(e) {
        switch(this.state.status) {
            case 'not friends':
            case 'rejected':
            case 'cancelled':
            case 'terminated':
                this.requestFriendship()
                break;
            case 'requested':
                this.cancelRequest()
                break;
            case 'accepted':
                this.terminateFriendship()
                break;
        }
    }

    render() {
        if (!this.state.display) {
            return null
        }

        return (
            <button 
                className="opaque-ui-friendbutton"
                type="button"
                onClick={this.handleButtonClick}
            >
                {statusToText[this.state.status]}
            </button>
        )
    }
}
