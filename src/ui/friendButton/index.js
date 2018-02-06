import React from 'react'
import _axios from '../../network/axios'

import './styles.scss'

/* props
 *  user: User
 *  target: User
 */

/* friendship statues:
 *  1: requested
 *  2: accepted
 *  3: rejected
 *  4: cancelled
 *  5: terminated
 *  6: not friends
 */

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'not friends',
            display: false
        }

        this.statusToText = {
            requested: 'cancel request',
            accepted: 'unfriend',
            rejected: 'add friend',
            cancelled: 'add friend',
            terminated: 'add friend',
            'not friends': 'add friend'
        }
    }

    handleFriendshipData(data) {
        if (data) {
            this.setState({ 
                status: data.status,
                display: true
            })
        } else {
            this.setState({ display: false })
        }
    }

    checkFriendship() {
        _axios
            .get(`/friends/check/${this.props.target.id}`)
            .then(handleFriendshipData)
    }

    requestFriendship() {
        _axios
            .get(`/friends/request/${this.props.target.id}`)
            .then(handleFriendshipData)
    }

    rejectRequest() {
        _axios
            .get(`/friends/reject/${this.props.target.id}`)
            .then(handleFriendshipData)
    }

    cancelRequest() {
        _axios
            .get(`/friends/cancel/${this.props.target.id}`)
            .then(handleFriendshipData)
    }

    terminateFriendship() {
        _axios
            .get(`/friends/terminate/${this.props.target.id}`)
            .then(handleFriendshipData)
    }

    handleButtonClick(e) {
        console.log('friend button click')
        console.log(this.state)
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
                {this.statusToText[this.state.status]}
            </button>
        )
    }
}
