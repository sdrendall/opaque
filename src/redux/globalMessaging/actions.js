export const INCOMING_GLOBAL_MESSAGE = 'INCOMING_GLOBAL_MESSAGE'

export function incomingGlobalMessage(message) {
    return {
        type: INCOMING_GLOBAL_MESSAGE,
        message
    }
}
