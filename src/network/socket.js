import * as io from 'socket.io-client'
import store from '../redux/store'
import { 
    addActiveConnection, 
    removeActiveConnection,
    setActiveConnections
} from '../redux/activeConnections/actions'
import { incomingGlobalMessage } from '../redux/globalMessaging/actions'

const socket = io.connect()

socket.on('userConnected', ({ activeConnections }) => store.dispatch(
    setActiveConnections(activeConnections)
))

socket.on('userDisconnected', ({ activeConnections }) => store.dispatch(
    setActiveConnections(activeConnections)
))

socket.on('activeConnections', ({ activeConnections }) => store.dispatch(
    setActiveConnections(activeConnections)
))

socket.on('newGlobalMessage', message => store.dispatch(
    incomingGlobalMessage(message)
))

export default socket
