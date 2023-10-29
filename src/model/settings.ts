import { atomWithLocalStorage } from '../helper/JotaiHelper'; 

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

export const generalSettingsAtom = atomWithLocalStorage('settings.general', {
    rollbackActivated: false,
});

export const mastoSettingsAtom = atomWithLocalStorage('settings.agent.masto', {
    url: '',
    appToken: '',
    activated: false
});

export const bskySettingsAtom = atomWithLocalStorage('settings.agent.bsky', {
    handle: '',
    appPassword: '',
    activated: false
});