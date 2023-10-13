import { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadIcon from '@mui/icons-material/Upload';
import BSSettings from './BSSettings'
import MastoSettings from './MastoSettings'

export default function Compose() {
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState({
        mastodon: {
            url: localStorage.getItem('mastoURL') ?? '',
            appToken: localStorage.getItem('mastoAppToken') ?? ''
        },
        bluesky: {
            handle: localStorage.getItem('bsHandle') ?? '',
            appPassword: localStorage.getItem('bsAppPassword') ?? ''
        }
    });
    const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);
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

    function updateMastoSettings(mastoSettings) {
        settings.mastodon = mastoSettings;
        setSettings(settings);
    }

    function updateBSSettings(bsSettings) {
        settings.bluesky = bsSettings;
        setSettings(settings);
    }

    function updateSettings() {
        localStorage.setItem('mastoURL', settings.mastodon.url);
        localStorage.setItem('mastoAppToken', settings.mastodon.appToken);
        localStorage.setItem('bsIdentifier', settings.bluesky.handle);
        localStorage.setItem('bsAppPassword', settings.bluesky.appPassword);
    }

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    function handleSettingsTabChange(event: React.SyntheticEvent, newValue: number) {
        setSelectedSettingsTab(newValue);
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
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={selectedSettingsTab} onChange={handleSettingsTabChange}>
                                <Tab label='Mastodon' />
                                <Tab label='BlueSky' />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={selectedSettingsTab} index={0}>
                            <MastoSettings settings={settings.mastodon} onChange={updateMastoSettings} />
                        </CustomTabPanel>
                        <CustomTabPanel value={selectedSettingsTab} index={1}>
                            <BSSettings settings={settings.bluesky} onChange={updateBSSettings} />
                        </CustomTabPanel>
                        <Button variant="contained" size="small" onClick={updateSettings}>Save Settings</Button>
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