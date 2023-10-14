import { atom, getDefaultStore } from 'jotai';

export interface GeneralSettings {
    rollbackActivated: boolean;
}

export interface MastodonSettings {
    url: string;
    appToken: string;
}

export interface BlueskySettings {
    handle: string;
    appPassword: string;
}

export interface Settings {
    general: GeneralSettings,
    mastodon: MastodonSettings,
    bluesky: BlueskySettings
}

const localStorageSettings = localStorage.getItem('settings');

const initialSettings: Settings = localStorageSettings ? JSON.parse(localStorageSettings) : {
    general: {
        rollbackActivated: false,
    },
    mastodon: {
        url: '',
        appToken: ''
    },
    bluesky: {
        handle: '',
        appPassword: ''
    }
};

export const generalSettingsAtom = atom(Object.assign({}, initialSettings.general));

export const mastodonSettingsAtom = atom(Object.assign({}, initialSettings.mastodon));

export const blueskySettingsAtom = atom(Object.assign({}, initialSettings.bluesky));

export const savedSettingsAtom = atom(Object.assign({}, initialSettings));

export const persistSettings = () => {
    const store = getDefaultStore();
    const settings = {
        general: store.get(generalSettingsAtom),
        mastodon: store.get(mastodonSettingsAtom),
        bluesky: store.get(blueskySettingsAtom)
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    store.set(savedSettingsAtom, settings);
};

export const getAgentSettings = () => {
    const store = getDefaultStore();
    const savedSettings = store.get(savedSettingsAtom);
    return {
        mastodon: savedSettings.mastodon,
        bluesky: savedSettings.bluesky,
    };
};