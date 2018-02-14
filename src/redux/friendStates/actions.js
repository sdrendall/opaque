import _axios from '../../network/axios'

export const ACCEPT_REQUEST = 'ACCEPT_REQUEST'
export const REJECT_REQUEST = 'REJECT_REQUEST'
export const CANCEL_REQUEST = 'CANCEL_REQUEST'
export const TERMINATE_FRIENDSHIP = 'TERMINATE_FRIENDSHIP'
export const REQUEST_FRIENDSHIP = 'REQUEST_FRIENDSHIP'
export const RETRIEVE_FRIENDS = 'RETRIEVE_FRIENDS'

export function retrieveFriends() {
    return _axios
        .get('/friends/all')
        .then(({ friends }) => ({
            type: RETRIEVE_FRIENDS,
            friends
        }))
}

export function acceptRequest(subject_id) {
    return _axios
        .post(`/friends/accept/${subject_id}`)
        .then(({ friendship }) => ({
            type: ACCEPT_REQUEST,
            id: subject_id
        }))
}

export function requestFriendship(subject_id) {
    return _axios
        .post(`/friends/request/${subject_id}`)
        .then(({ friendship }) => ({
            type: REQUEST_FRIENDSHIP,
            id: subject_id
        }))
}

export function rejectRequest(subject_id) {
    return _axios
        .post(`/friends/reject/${subject_id}`)
        .then(({ friendship }) => ({
            type: REJECT_REQUEST,
            id: subject_id
        }))
}

export function cancelRequest(subject_id) {
    return _axios
        .post(`/friends/cancel/${subject_id}`)
        .then(({ friendship }) => ({
            type: CANCEL_REQUEST,
            id: subject_id
        }))
}

export function terminateFriendship(subject_id) {
    return _axios
        .post(`/friends/terminate/${subject_id}`)
        .then(({ friendship }) => ({
            type: TERMINATE_FRIENDSHIP,
            id: subject_id
        }))
}
