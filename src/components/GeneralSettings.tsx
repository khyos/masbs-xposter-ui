import { useAtom } from "jotai";
import Switch from '@mui/material/Switch';
import { generalSettingsAtom } from '../model/settings';

export default function GeneralSettings() {
    const [generalSettings, setGeneralSettings] = useAtom(generalSettingsAtom);

    function handleRollbackChanged (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        setGeneralSettings((prevGeneralSettings) => ({...prevGeneralSettings, rollbackActivated: checked}));
    }

    return (
        <div style={{display: 'flex'}}>
            <Switch checked={generalSettings.rollbackActivated} onChange={handleRollbackChanged} name="masto" />
        </div>
    )
}