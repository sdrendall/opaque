export const ADD_ACTIVE_CONNECTION = 'ADD_ACTIVE_CONNECTION'
export const REMOVE_ACTIVE_CONNECTION = 'REMOVE_ACTIVE_CONNECTION'
export const SET_ACTIVE_CONNECTIONS = 'SET_ACTIVE_CONNECTIONS'

export function addActiveConnection(connection) {
    return {
        type: ADD_ACTIVE_CONNECTION,
        connection
    }
}

export function removeActiveConnection(connection) {
    return {
        type: REMOVE_ACTIVE_CONNECTION,
        connection
    }
}

export function setActiveConnections(activeConnections) {
    return {
        type: SET_ACTIVE_CONNECTIONS,
        activeConnections
    }
}
