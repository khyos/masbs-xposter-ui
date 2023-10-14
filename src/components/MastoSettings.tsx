import { useAtom } from "jotai";
import TextField from '@mui/material/TextField';
import { mastodonSettingsAtom } from '../model/settings';

export default function MastoSettings() {
    const [mastoSettings, setMastoSettings] = useAtom(mastodonSettingsAtom);

    function mastoInstanceURLChange (event: React.ChangeEvent<HTMLInputElement>) {
        mastoSettings.url = event.target.value;
        setMastoSettings(mastoSettings);
    }

    function mastoAppTokenChange (event: React.ChangeEvent<HTMLInputElement>) {
        mastoSettings.appToken = event.target.value;
        setMastoSettings(mastoSettings);
    }
    
    return (
        <div style={{display: 'flex'}}>
            <TextField required label="Instance URL" variant="outlined" defaultValue={mastoSettings.url} onChange={mastoInstanceURLChange} InputLabelProps={{ shrink: true }} />
            <span style={{flexGrow: 1}}></span>
            <TextField type="password" required label="App Token" variant="outlined" defaultValue={mastoSettings.appToken} onChange={mastoAppTokenChange} InputLabelProps={{ shrink: true }} />
        </div>
    )
}