import React from 'react'
import PPic from '../../users/profilePic'
import ResponseButton from '../requestResponseButton'

import { connect } from 'react-redux'
import { 
    retrieveFriends, 
    terminateFriendship 
} from '../../redux/friendStates/actions'

import './styles.scss'

function friendHoc(ActionButton) {
    return function(props) {
        const { friend } = props
        return (
            <div className='opaque-friend'>
                <PPic user={friend} />
                <h2>{friend.username}</h2>
                <ActionButton
                    friendId={friend.id}
                />
            </div>
        )
    }
}

const FriendPending = friendHoc(ResponseButton)
const FriendAccepted = friendHoc(
    connect()
    (function({ dispatch, friendId }) {
        return (
            <button
                type='button'
                onClick={() => dispatch(terminateFriendship(friendId))}
            >
                unfriend
            </button>
        )
    })
)

const mapStateToProps = ({ friends }) => { 
    friends = friends || []
    return { 
        acceptedFriends: friends
            .filter(friend => friend.status == 'accepted')
            .map(friend => <FriendAccepted
                friend={friend} 
                key={friend.id}
            />),
        pendingFriends: friends
            .filter(friend => friend.status == 'requested')
            .map(friend => <FriendPending 
                friend={friend} 
                key={friend.id}
            />)
    } 
}

export default connect(mapStateToProps)
(class extends React.Component {
    componentDidMount() {
        this.props.dispatch(retrieveFriends())
    }

    render() {
        const { acceptedFriends, pendingFriends } = this.props
        window.acceptedFriends = acceptedFriends
        window.pendingFriends = pendingFriends
        return (
            <div className="opaque-frienddisplay">
            {(pendingFriends.length > 0) && (
                <div className="opaque-pendingfriends">
                    <h2> pending requests </h2>
                    <div className="opaque-friendlist">
                        {pendingFriends}
                    </div>
                </div>
            )}
            {(acceptedFriends.length > 0) ? (
                <div className="opaque-acceptedfriends">
                    <h2> friends </h2>
                    <div className="opaque-friendlist">
                        {acceptedFriends}
                    </div>
                </div>
            ) : (
                <h2> you don't have any friends </h2>
            )}
            </div>
        )
    }
})
