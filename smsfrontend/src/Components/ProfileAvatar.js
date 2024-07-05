import { Avatar } from '@mui/material';
import React from 'react';

const ProfileAvatar = ({size}) => {
    return (
        <div>
            <Avatar
                sx={{
                    height:size,
                    width:size,
                }}
            />
        </div>
    );
}

export default ProfileAvatar;
