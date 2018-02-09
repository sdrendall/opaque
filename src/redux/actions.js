import _axios from '../network/axios'

export function retrieveFriends() {
    return _axios
        .get('/friends/all')
        .then(({ friends }) => ({
            type: 'RETRIEVE_FRIENDS',
            friends
        }))
}

export function acceptRequest(subject_id) {
    return _axios
        .post(`/friends/accept/${subject_id}`)
        .then(({ friendship }) => ({
            type: 'ACCEPT_REQUEST',
            id: subject_id
        }))
}

export function requestFriendship(subject_id) {
    return _axios
        .post(`/friends/request/${subject_id}`)
        .then(({ friendship }) => ({
            type: 'REQUEST_FRIENDSHIP',
            id: subject_id
        }))
}

export function rejectRequest(subject_id) {
    return _axios
        .post(`/friends/reject/${subject_id}`)
        .then(({ friendship }) => ({
            type: 'REJECT_REQUEST',
            id: subject_id
        }))
}

export function cancelRequest(subject_id) {
    return _axios
        .post(`/friends/cancel/${subject_id}`)
        .then(({ friendship }) => ({
            type: 'CANCEL_REQUEST',
            id: subject_id
        }))
}

export function terminateFriendship(subject_id) {
    return _axios
        .post(`/friends/terminate/${subject_id}`)
        .then(({ friendship }) => ({
            type: 'TERMINATE_FRIENDSHIP',
            id: subject_id
        }))
}
