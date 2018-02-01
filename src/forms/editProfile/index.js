import React from 'react'
import axios from 'axios'

/* props
 *  updateUser(): user -> undefined
 */

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            file: undefined
        }
        this.selectFile = this.selectFile.bind(this)
        this.upload = this.upload.bind(this)
    }

    selectFile(e) {
        console.log('handling file selection....')
        this.setState({
            file: e.target.files[0]
        })
    }

    upload() {
        const data = new FormData()
        data.append('file', this.state.file)
        data.append('id', this.props.user.id)
        axios
            .post('/upload', data)
            .then(({ data }) => {
                if (data.success) {
                    this.props.updateUser(data.user)
                } else {
                    alert(`Upload failed! ${data.reason}`)
                }
            })
    }

    render() {
        return ( 
            <form className="opaque-form-editprofile">
                <input type="file" onChange={this.selectFile} />
                <button type="button" onClick={this.upload}>
                    Submit
                </button>
            </form>
        )    
    }
}
