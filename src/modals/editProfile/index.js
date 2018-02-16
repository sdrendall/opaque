import React from 'react'

import ImageUploadForm from '../../forms/imageUpload'
import EditProfileForm from '../../forms/editProfile'
import opaqueModal from '../opaqueModal'
import PPic from '../../users/profilePic'

import './styles.scss'

/* props
 * user: User
 * updateUser: (User) => null
 */

export default opaqueModal(
    function(props) {
        return (
            <div className="opaque-modal-editprofile">
                <header>
                    <h1>{props.user.username}</h1>
                    <PPic
                        user={props.user}
                    />
                </header>
                <ImageUploadForm 
                    user={props.user}
                    updateUser={props.updateUser}
                />
                <EditProfileForm
                    user={props.user}
                    updateUser={props.updateUser}
                />
            </div>
        )
    }
)
