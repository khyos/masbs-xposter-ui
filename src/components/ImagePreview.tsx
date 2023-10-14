import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';

export default function ImagePreview({ imageSrc, onDelete, onAltTextChange }) {
    const [altText, setAltText] = useState('');

    const handleAltTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAltText(event.target.value);
        onAltTextChange();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <div style={{ height: 80, width: 80, flexGrow: 0 }}>
                <img src={imageSrc} />
            </div>
            <TextField
                value={altText}
                placeholder="Add alt text"
                multiline
                minRows={2}
                onChange={handleAltTextChange}
                style={{ flexGrow: 1 }}
            />
            <IconButton size="small" style={{ flexGrow: 0 }} onClick={onDelete} >
                <ClearIcon />
            </IconButton>
        </div>
    )
}