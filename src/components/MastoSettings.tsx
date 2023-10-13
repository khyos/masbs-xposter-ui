import { useState } from 'react'
import TextField from '@mui/material/TextField';

export default function MastoSettings({settings, onChange}) {
    const [url, setUrl] = useState(settings.url)
    const [appToken, setAppToken] = useState(settings.appToken)

    function mastoInstanceURLChange (event: any) {
        setUrl(event.target.value);
        onChange({
            url: event.target.value,
            appToken: appToken
        });
    }

    function mastoAppTokenChange (event: any) {
        setAppToken(event.target.value);
        onChange({
            url: url,
            appToken: event.target.value
        });
    }
    
    return (
        <div style={{display: 'flex'}}>
            <TextField required label="Instance URL" variant="outlined" defaultValue={url} onChange={mastoInstanceURLChange} InputLabelProps={{ shrink: true }} />
            <span style={{flexGrow: 1}}></span>
            <TextField required label="App Token" variant="outlined" defaultValue={appToken} onChange={mastoAppTokenChange} InputLabelProps={{ shrink: true }} />
        </div>
    )
}