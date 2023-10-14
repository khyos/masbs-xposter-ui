import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import BSSettings from './BSSettings';
import GeneralSettings from './GeneralSettings';
import MastoSettings from './MastoSettings';

export default function Settings({ onSave }) {
    const [settings, setSettings] = useState({
        general: {
            rollbackActivated: localStorage.getItem('rollbackActivated') === 'true' ?? false,
        },
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

    function handleGeneralSettingsChange(generalSettings) {
        settings.general = generalSettings;
        setSettings(settings);
    }

    function handleMastoSettingsChange(mastoSettings) {
        settings.mastodon = mastoSettings;
        setSettings(settings);
    }

    function handleBskySettingsChange(bskySettings) {
        settings.bluesky = bskySettings;
        setSettings(settings);
    }

    function updateSettings() {
        localStorage.setItem('rollbackActivated', `${settings.general.rollbackActivated}`);
        localStorage.setItem('mastoURL', settings.mastodon.url);
        localStorage.setItem('mastoAppToken', settings.mastodon.appToken);
        localStorage.setItem('bsIdentifier', settings.bluesky.handle);
        localStorage.setItem('bsAppPassword', settings.bluesky.appPassword);
        onSave();
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
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedSettingsTab} onChange={handleSettingsTabChange}>
                    <Tab label='General' />
                    <Tab label='Mastodon' />
                    <Tab label='BlueSky' />
                </Tabs>
            </Box>
            <CustomTabPanel value={selectedSettingsTab} index={0}>
                <GeneralSettings settings={settings.general} onChange={handleGeneralSettingsChange} />
            </CustomTabPanel>
            <CustomTabPanel value={selectedSettingsTab} index={1}>
                <MastoSettings settings={settings.mastodon} onChange={handleMastoSettingsChange} />
            </CustomTabPanel>
            <CustomTabPanel value={selectedSettingsTab} index={2}>
                <BSSettings settings={settings.bluesky} onChange={handleBskySettingsChange} />
            </CustomTabPanel>
            <Button variant="contained" size="small" onClick={updateSettings}>Save Settings</Button>
        </>
    )
}