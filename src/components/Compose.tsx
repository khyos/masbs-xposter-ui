import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadIcon from '@mui/icons-material/Upload';
import Settings from './Settings';
import ImagePreview from './ImagePreview';
import { initializeAgents, postAtom, postOrchestratorAtom } from '../model/post';
import { mastoSettingsAtom, bskySettingsAtom } from '../model/settings';
import { BskyAgentConfiguration, MastoAgentConfiguration, Media, Post } from 'masbs-xposter';

export default function Compose() {
    const [message, setMessage] = useState('');
    const [messageStatus, setMessageStatus] = useState<AlertColor>('success');
    const [showSettings, setShowSettings] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const [post, setPost] = useAtom(postAtom);
    const postOrchestrator = useAtomValue(postOrchestratorAtom);
    const [mastoSettings, setMastoSettings] = useAtom(mastoSettingsAtom);
    const [bskySettings, setBskySettings] = useAtom(bskySettingsAtom);

    function handleTextAreaChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPost((prevPost: Post) => ({ ...prevPost, text: event.target.value }));
    }

    function validatePost(): void {
        postOrchestrator.validatePost(post);
    }

    function submit(event: React.SyntheticEvent) {
        event.preventDefault();
        console.log(post.text);
        postOrchestrator.post(post).then(() => {
            setMessage('Post Successful');
            setMessageStatus('success');
            setShowMessage(true);
            window.setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }).catch(() => {
            setMessage('Post Error');
            setMessageStatus('error');
            setShowMessage(true);
            window.setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        });
    }

    function onMastoStatusChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMastoSettings((prevMastoSettings: Post) => ({ ...prevMastoSettings, activated: event.target.checked }));
        postOrchestrator.getAgentByID(MastoAgentConfiguration.ID).activated = event.target.checked;
        validatePost();
    }

    function onBSStatusChange(event: React.ChangeEvent<HTMLInputElement>) {
        setBskySettings((prevBskySettings: Post) => ({ ...prevBskySettings, activated: event.target.checked }));
        postOrchestrator.getAgentByID(BskyAgentConfiguration.ID).activated = event.target.checked;
        validatePost();
    }

    function handleSettingsSaved() {
        initializeAgents.then(() => {
            validatePost();
        })
    }

    function handleImageUploadChange(event: React.ChangeEvent<HTMLInputElement>) {
        const medias = post.medias;
        const files = event.target.files
        if (files) {
            for (const file of files) {
                const media = new Media();
                media.file = file;
                medias.push(media);
            }
        }
        setPost((prevPost: Post) => ({ ...prevPost, medias: medias }));
    }

    function handleAltTextChange(index: number, altText: string) {
        const media = post.medias[index];
        media.altText = altText;
        setPost((prevPost: Post) => ({ ...prevPost }));
    }

    function handleMediaDelete(index: number) {
        const medias = post.medias;
        medias.splice(index, 1);
        setPost((prevPost: Post) => ({ ...prevPost, medias: medias }));
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
                    <FormGroup row style={{ marginTop: 10, display: post.medias.length > 0 ? 'block' : 'none' }}>
                        {post.medias.map((media: Media, index: number) => {
                            const fileURL = URL.createObjectURL(media.file);
                            return (
                                <ImagePreview key={index} index={index} imageSrc={fileURL} onAltTextChange={handleAltTextChange} onDelete={handleMediaDelete}></ImagePreview>
                            );
                        })}
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
                                    <Switch checked={mastoSettings.activated} onChange={onMastoStatusChange} name="masto" />
                                }
                                label='Mastodon'
                            />
                            <FormControlLabel
                                control={
                                    <Switch checked={bskySettings.activated} onChange={onBSStatusChange} name="bsky" />
                                }
                                label='BlueSky'
                            />
                            <Button variant="contained" size="small" type="submit">Submit</Button>
                        </FormGroup>
                    </FormGroup>
                </FormControl>
            </form>
            <Snackbar open={showMessage} anchorOrigin={{ vertical: 'bottom', horizontal:'center' }}>
                <Alert severity={messageStatus} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}