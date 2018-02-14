import {
    ACCEPT_REQUEST,
    REJECT_REQUEST,
    CANCEL_REQUEST,
    TERMINATE_FRIENDSHIP,
    REQUEST_FRIENDSHIP,
    RETRIEVE_FRIENDS
} from './actions.js'

const actionTypeToStatusMap = {
    ACCEPT_REQUEST: 'accepted',
    REJECT_REQUEST: 'rejected',
    CANCEL_REQUEST: 'cancelled',
    TERMINATE_FRIENDSHIP: 'terminated',
    REQUEST_FRIENDSHIP: 'requested'
}

const handler = {}

handler[RETRIEVE_FRIENDS] = (state, action) => ({
    ...state,
    friends: action.friends
})

const remainingActions = [
    ACCEPT_REQUEST,
    REJECT_REQUEST,
    CANCEL_REQUEST,
    TERMINATE_FRIENDSHIP,
    REQUEST_FRIENDSHIP,
]
remainingActions.forEach(actionType => handler[actionType] = 
    (state, action) => ({
        ...state,
        friends: state.friends.map(friend => 
            (friend.id == action.id) ? ({ 
                ...friend,
                status: actionTypeToStatusMap[actionType]
            }) : (
                friend
            )
        )
    }))

export default handler
