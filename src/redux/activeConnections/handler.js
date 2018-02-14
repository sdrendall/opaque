import { 
    ADD_ACTIVE_CONNECTION, 
    REMOVE_ACTIVE_CONNECTION,
    SET_ACTIVE_CONNECTIONS
} from './actions.js'

export default {
    ADD_ACTIVE_CONNECTION: (state, { connection }) => ({
        ...state,
        activeConnections: [
            ...state.activeConnections,
            connection
        ]
    }), 

    REMOVE_ACTIVE_CONNECTION: (state, { connection }) => ({
        ...state,
        activeConnections: this.state.activeConnections.filter(c => 
            c.socketId != connection.socketId
        )
    }), 

    SET_ACTIVE_CONNECTIONS: (state, { activeConnections }) => ({
        ...state,
        activeConnections
    })
}
