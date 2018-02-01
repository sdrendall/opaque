import React from 'react'

import EditProfileForm from '../forms/editProfile'
import opaqueModal from './opaqueModal'
import UserTag from '../users/userTag'

export default opaqueModal(
    function(props) {
        return (
            <div className="opaque-modal-editprofile">
                <UserTag
                    user={props.user}
                    openProfileEditor={() => {}}
                />
                <EditProfileForm 
                    user={props.user}
                    updateUser={props.updateUser}
                />
            </div>
        )
    }
)
