import axios from 'axios'

const instance = axios.create({
    xsrfCookieName: 'mytoken',
    xsrfHeaderName: 'csrf-token'
})

const _axios = {}
_axios.get = (route, ...args) => instance
    .get(route, ...args)
    .then(({ data, status }) => {
    if (status >= 400) {
        alert(`GET request to ${route} failed with status: ${status}`)
        return null
    } else {
        return data
    }
})

_axios.post = (route, ...args) => instance
    .post(route, ...args)
    .then(({ data, status }) => {
    if (status >= 400) {
        alert(`POST request to ${route} failed with status: ${status}`)
        return null
    } else {
        return data
    }
})

export default _axios
