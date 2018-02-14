import * as io from 'socket.io-client'
import store from '../redux/store'
import { 
    addActiveConnection, 
    removeActiveConnection,
    setActiveConnections
} from '../redux/activeConnections/actions'

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

export default socket
