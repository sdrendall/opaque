import React from 'react'
import _axios from '../../network/axios'
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
        _axios
            .post('/portal/login', {
                username,
                password
            })
            .then(data => {
                const { result, msg } = data
                if ( result == 'loginSuccess' || result == 'newUser' ) {
                    window.location.reload()
                } else {
                    this.setState({ msg })
                }
            })
            .catch(error => {
                alert(`login failed! reason: ${error}`)
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
                    <input 
                        type="text"
                        value={this.state.username}
                        maxLength="32"
                        onChange={ event => 
                            this.setState(
                                {'username': event.target.value}
                            )
                        }
                    />
                </label>
                <label>
                    password
                    <input 
                        type="password"
                        value={this.state.password}
                        maxLength="64"
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
