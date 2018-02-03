import React from 'react'
import axios from 'axios'

/* props
 *  user: User
 *  updateUser: () => null
 */

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bio: props.user.bio || '',
            error: ''
        }
        this.submit = this.submit.bind(this)
    }

    submit() {
        axios
            .post('/portal/updateBio', { bio: this.state.bio })
            .then(({ status, data }) => {
                if (status = 200 && data.success) {
                    this.props.updateUser(data.user)
                } else if (status != 200) {
                    this.setState({
                        error: `update request failed with status ${status}`
                    })
                } else {
                    this.setState({
                        error: `server failure: ${data.reason}`
                    })
                }
            })
    }

    render() {
        return (
            <form className="opaque-form-editprofile">
                <label>
                    <textarea 
                        cols="75" 
                        rows="10"
                        onInput={event => {
                            this.setState({
                                bio: event.target.value
                            })
                        }}
                        defaultValue={this.props.user.bio}
                    />
                    <h2>edit bio</h2>
                    <button 
                        type="button"
                        onClick={this.submit}
                    >
                        submit
                    </button>
                </label>
            </form>
    )    }
}
