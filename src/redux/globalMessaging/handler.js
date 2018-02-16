import { INCOMING_GLOBAL_MESSAGE } from './actions'

export default {
    INCOMING_GLOBAL_MESSAGE: (state, { message }) => ({
        ...state,
        globalMessages: [
            message,
            ...state.globalMessages
        ]
    })
}
