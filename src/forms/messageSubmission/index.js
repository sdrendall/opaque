import React from 'react'

/* props
 *  submit: (msg) => null
 *
 */

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    render() {
        const { textAreaCols, textAreaRows } = this.props
        return (
            <div className="opaque-form-messagesub">
                <input
                    type='text'
                    onInput={event => {
                        this.setState({
                            message: event.target.value
                        })
                    }}
                    onKeyPress={event => {
                        if (event.key == 'Enter' && !event.shiftKey) {
                            this.props.submit(this.state.message)
                            this.setState({ message: '' })
                            event.preventDefault()
                        }
                    }}
                    value={this.state.message}
                />
            </div>
        )
    }
}
