import { useAtom } from "jotai";
import TextField from '@mui/material/TextField';
import { bskySettingsAtom } from '../model/settings';

export default function BSSettings() {
    const [blueskySettings, setBlueskySettings] = useAtom(bskySettingsAtom);

    function bsHandleChange (event: React.ChangeEvent<HTMLInputElement>) {
        blueskySettings.handle = event.target.value;
        setBlueskySettings(blueskySettings);
    }

    function bsAppPasswordChange (event: React.ChangeEvent<HTMLInputElement>) {
        blueskySettings.appPassword = event.target.value;
        setBlueskySettings(blueskySettings);
    }

    return (
        <div style={{display: 'flex'}}>
            <TextField required label="Handle" variant="outlined" defaultValue={blueskySettings.handle} onChange={bsHandleChange} InputLabelProps={{ shrink: true }} />
            <span style={{flexGrow: 1}}></span>
            <TextField type="password" required label="App Password" variant="outlined" defaultValue={blueskySettings.appPassword} onChange={bsAppPasswordChange} InputLabelProps={{ shrink: true }} />
        </div>
    )
}