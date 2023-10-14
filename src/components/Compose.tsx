import { useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadIcon from '@mui/icons-material/Upload';
import Settings from './Settings';

export default function Compose() {
    const [showSettings, setShowSettings] = useState(false);

    const [text, setText] = useState('');
    const [mastoActivated, setMastoActivated] = useState(localStorage.getItem('mastoActivated') == 'true');
    const [bsActivated, setBSActivated] = useState(localStorage.getItem('bsActivated') == 'true');

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    function submit(event: React.SyntheticEvent) {
        event.preventDefault();
        console.log(text);
    }

    function onMastoStatusChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMastoActivated(event.target.checked);
        localStorage.setItem('mastoActivated', `${event.target.checked}`);
    }

    function onBSStatusChange(event: React.ChangeEvent<HTMLInputElement>) {
        setBSActivated(event.target.checked);
        localStorage.setItem('bsActivated', `${event.target.checked}`);
    }

    function handleSettingsSaved() {

    }

    return (
        <div className='compose'>
            <form onSubmit={submit}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup row style={{ display: 'flex' }}>
                        <FormGroup row style={{ flexGrow: 1 }}>
                        </FormGroup>
                        <FormGroup row>
                            <ToggleButton
                                size="small"
                                value="toggleSettings"
                                selected={showSettings}
                                onChange={() => {
                                    setShowSettings(!showSettings);
                                }}
                            >
                                <SettingsIcon />
                            </ToggleButton>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup row style={{ marginTop: 10, display: showSettings ? 'block' : 'none' }}>
                        <Settings onSave={handleSettingsSaved} ></Settings>
                    </FormGroup>
                    <FormGroup row style={{ marginTop: 10 }}>
                        <TextField
                            id="outlined-textarea"
                            placeholder="What's up?"
                            multiline
                            minRows={2}
                            onChange={handleTextAreaChange}
                            style={{ width: 600 }}
                        />
                    </FormGroup>
                    <FormGroup row style={{ marginTop: 10, display: 'flex' }}>
                        <FormGroup row style={{ flexGrow: 1 }}>
                            <IconButton size="small">
                                <UploadIcon />
                            </IconButton>
                            <IconButton size="small">
                                <InsertEmoticonIcon />
                            </IconButton>
                        </FormGroup>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch checked={mastoActivated} onChange={onMastoStatusChange} name="masto" />
                                }
                                label='Mastodon'
                            />
                            <FormControlLabel
                                control={
                                    <Switch checked={bsActivated} onChange={onBSStatusChange} name="bsky" />
                                }
                                label='BlueSky'
                            />
                            <Button variant="contained" size="small" type="submit">Submit</Button>
                        </FormGroup>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    )
}