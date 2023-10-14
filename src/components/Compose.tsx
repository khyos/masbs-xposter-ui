import { useAtom } from 'jotai';
import { useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadIcon from '@mui/icons-material/Upload';
import Settings from './Settings';
import ImagePreview from './ImagePreview';
import { postAtom } from '../model/post';
import { PostOrchestrator } from 'masbs-xposter';
import { getAgentSettings } from '../model/settings';

export default function Compose() {
    const [showSettings, setShowSettings] = useState(false);

    const [post, setPost] = useAtom(postAtom);
    const [mastoActivated, setMastoActivated] = useState(localStorage.getItem('mastoActivated') == 'true');
    const [bsActivated, setBSActivated] = useState(localStorage.getItem('bsActivated') == 'true');
    let postOrchestrator : PostOrchestrator;

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost((prevPose) => ({...prevPose, text: event.target.value}));
    };

    function submit(event: React.SyntheticEvent) {
        event.preventDefault();
        console.log(post.text);
        postOrchestrator.post(post);
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
        if (postOrchestrator) {
            //TODO destroy
        }
        postOrchestrator = new PostOrchestrator();
        postOrchestrator.initializeAgents(['bluesky', 'mastodon'], getAgentSettings())
    }

    function handleImageUploadChange(event) {
        const files = event.target.files
        if (files[0]) {
            document.getElementById('truc').src = URL.createObjectURL(files[0])
        }
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

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
                            placeholder="What's up?"
                            multiline
                            minRows={2}
                            onChange={handleTextAreaChange}
                            style={{ width: 600 }}
                        />
                    </FormGroup>
                    <FormGroup row style={{ marginTop: 10 }}>
                        <ImagePreview></ImagePreview>
                    </FormGroup>
                    <FormGroup row style={{ marginTop: 10, display: 'flex' }}>
                        <FormGroup row style={{ flexGrow: 1 }}>
                            <IconButton component="label" size="small">
                                <UploadIcon />
                                <VisuallyHiddenInput type="file" accept='image/*' onChange={handleImageUploadChange} />
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