const actionTypeToStatusMap = {
    'ACCEPT_REQUEST': 'accepted',
    'REJECT_REQUEST': 'rejected',
    'CANCEL_REQUEST': 'cancelled',
    'TERMINATE_FRIENDSHIP': 'terminated',
    'REQUEST_FRIENDSHIP': 'requested'
}

export default function(state = {}, action) {
    switch (action.type) {
        case 'RETRIEVE_FRIENDS':
            state = {
                ...state,
                friends: action.friends
            }
        break;

        case 'ACCEPT_REQUEST':
        case 'REJECT_REQUEST':
        case 'CANCEL_REQUEST':
        case 'TERMINATE_FRIENDSHIP':
        case 'REQUEST_FRIENDSHIP':
            state = {
                ...state,
                friends: state.friends.map(friend => 
                    (friend.id == action.id) ? ({ 
                        ...friend,
                        status: actionTypeToStatusMap[action.type]
                    }) : (
                        friend
                    )
                )
            }
        break;
    }

    window.state = state
    return state
}
