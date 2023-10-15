import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';

interface ImagePreviewProps {
    index: number;
    imageSrc: string;
    onDelete: (index: number) => void;
    onAltTextChange: (index: number, altText: string) => void;
}

export default function ImagePreview({ index, imageSrc, onDelete, onAltTextChange } : ImagePreviewProps) {
    const [altText, setAltText] = useState('');

    const handleAltTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAltText(event.target.value);
        onAltTextChange(index, event.target.value);
    };

    const handleDelete = () => {
        onDelete(index);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <div style={{ display: 'flex', height: 80, width: 80, flexGrow: 0, alignItems: 'center', justifyContent: 'center' }}>
                <img src={imageSrc} style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}/>
            </div>
            <TextField
                value={altText}
                placeholder="Add alt text"
                multiline
                minRows={2}
                onChange={handleAltTextChange}
                style={{ flexGrow: 1 }}
            />
            <IconButton size="small" style={{ flexGrow: 0 }} onClick={handleDelete} >
                <ClearIcon />
            </IconButton>
        </div>
    )
}