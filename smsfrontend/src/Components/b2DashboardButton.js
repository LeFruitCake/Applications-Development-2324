import React from 'react';

const B2DashboardButton = ({height}) => {
    return (
        <div style={{display:'flex', position:'relative'}}>
            <div style={{backgroundColor:'rgb(253,204,3)',height:height,width:height,borderRadius:'5px', marginTop:'-8px', position:'relative', zIndex:1, boxShadow:'0px 0px 10px rgba(0,0,0,0.5)'}}>
                
            </div>
            <div style={{backgroundColor:'black',height:height,width:height,borderRadius:'5px', marginLeft:'-10px', position:'relative',zIndex:0}}>
                
            </div>
        </div>
    );
}

export default B2DashboardButton;
