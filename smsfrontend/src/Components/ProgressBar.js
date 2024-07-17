import { width } from '@mui/system';
import React from 'react';

const ProgressBar = ({value}) => {
    return (
        <div style={{width:'100%', border:'solid 1px black', height:'20px'}}>
            <div style={{height:'100%',backgroundColor:'blue', width:`${value}%`}}></div>
        </div>
    );
}

export default ProgressBar;
