import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import BSSettings from './BSSettings';
import GeneralSettings from './GeneralSettings';
import MastoSettings from './MastoSettings';
interface SettingsProp {
    onSave: () => void;
}

export default function Settings({ onSave } : SettingsProp) {
    const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);

    function updateSettings() {
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
                <GeneralSettings />
            </CustomTabPanel>
            <CustomTabPanel value={selectedSettingsTab} index={1}>
                <MastoSettings />
            </CustomTabPanel>
            <CustomTabPanel value={selectedSettingsTab} index={2}>
                <BSSettings />
            </CustomTabPanel>
            <Button variant="contained" size="small" onClick={updateSettings}>Save Settings</Button>
        </>
    )
}