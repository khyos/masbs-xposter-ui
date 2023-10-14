import { useState } from 'react'
import Switch from '@mui/material/Switch';

export default function GeneralSettings({settings, onChange}) {
    const [rollbackActivated, setRollbackActivated] = useState(settings.rollbackActivated);

    function handleRollbackChanged (event: any) {
        setRollbackActivated(event.target.value);
        onChange(settings);
    }

    return (
        <div style={{display: 'flex'}}>
            <Switch checked={rollbackActivated} onChange={handleRollbackChanged} name="masto" />
        </div>
    )
}