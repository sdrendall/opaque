import React from 'react'
import axios from '../../network/axios'
import './styles.scss'

/* props
 *  updateUser: User => null
 */



class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            msg: '',
        }
        this.submit = this.submit.bind(this)
    }

    submit() {
        const { username, password } = this.state
        axios
            .post('/portal/login', {
                username,
                password
            })
            .then(({ data }) => {
                const { user, msg } = data
                this.setState({ msg })
                this.props.updateUser(user)
            })
    }

    render() {
        return (
            <form 
                className='opaque-form-login' 
                onSubmit={this.submit}
                onKeyPress={e => e.key == 'Enter' && this.submit()}
            >
                <label>
                    user
                    <input type="text"
                        value={this.state.username}
                        onChange={ event => 
                            this.setState(
                                {'username': event.target.value}
                            )
                        }
                    />
                </label>
                <label>
                    password
                    <input type="password"
                        value={this.state.password}
                        onChange={ event => 
                            this.setState(
                                {'password': event.target.value}
                            )
                        }
                    />
                </label>
                {this.state.msg && 
                    <span>{this.state.msg}</span>
                }
            </form>
        )
    }
}

export default LoginForm
