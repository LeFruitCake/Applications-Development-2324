import React from 'react';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import { Stack } from '@mui/material';

const ExcelFile = ({file, color}) => {
    return (
        <a href={file.filePath} download={file.orig_path} style={{padding:'5px', textDecoration:'none', color:'white', borderRadius:'3px', backgroundColor:color, display:'flex', alignItems:'center', width:'fit-content', marginTop:'4px'}}>
                <FileDownloadSharpIcon/>
                {file.orig_path}
        </a>
    );
}

export default ExcelFile;
