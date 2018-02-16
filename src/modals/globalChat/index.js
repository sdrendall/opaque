import React from 'react'
import MessageList from '../../ui/messageList'
import MessageSubmission from '../../forms/messageSubmission'
import ActiveUserList from '../../users/activeUserList'
import opaqueModal from '../opaqueModal'
import socket from '../../network/socket'

import './styles.scss'

import { connect } from 'react-redux'

function mapStateToProps({ globalMessages }) {
    return { messages: globalMessages }
}

/* props
 *  user: User
 *  messages: [Message] // dux
 */

export default connect(mapStateToProps)
(opaqueModal(class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anonymous: false
        }
        this.submit = this.submit.bind(this)
    }

    submit(message) {
        console.log(`submitting ${message}`)
        socket.emit('messageGlobal', {
            anonymous: this.state.anonymous,
            message
        })
    }

    render() {
        return (
            <div className="opaque-globalchat">
                <h1>global</h1>
                <MessageSubmission submit={this.submit} />
                <MessageList messages={this.props.messages} />
                <ActiveUserList />
            </div>
        )
    }
}))
