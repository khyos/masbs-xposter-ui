import { useState } from 'react'
import TextField from '@mui/material/TextField';

export default function BSSettings({settings, onChange}) {
    const [identifier, setIdentifier] = useState(settings.identifier);
    const [appPassword, setAppPassword] = useState(settings.appPassword);

    function bsIdentifierChange (event: any) {
        setIdentifier(event.target.value);
        onChange(settings);
    }

    function bsAppPasswordChange (event: any) {
        setAppPassword(event.target.value);
        onChange(settings);
    }

    return (
        <div style={{display: 'flex'}}>
            <TextField required label="Handle" variant="outlined" defaultValue={identifier} onChange={bsIdentifierChange} InputLabelProps={{ shrink: true }} />
            <span style={{flexGrow: 1}}></span>
            <TextField required label="App Password" variant="outlined" defaultValue={appPassword} onChange={bsAppPasswordChange} InputLabelProps={{ shrink: true }} />
        </div>
    )
}