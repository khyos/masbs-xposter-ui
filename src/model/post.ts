import { atom, getDefaultStore } from 'jotai';
import { BskyAgentConfiguration, MastoAgentConfiguration, Post, PostLanguage, PostOrchestrator, PostVisibility } from 'masbs-xposter';
import { bskySettingsAtom, mastoSettingsAtom } from '../model/settings';

export interface PostDefaultSettings {
    language: string,
    visibility: string
}

const localStoragePostDefaultSettings = localStorage.getItem('settings');

const postDefaultSettings: PostDefaultSettings = localStoragePostDefaultSettings ? JSON.parse(localStoragePostDefaultSettings) : {
    language: 'en_US',
    visibility: 'PUBLIC'
};

const initialPost: Post = {
    language: PostLanguage[postDefaultSettings.language],
    medias: [],
    poll: null,
    replyTo: null,
    sensitive: false,
    sensitiveText: '',
    text: '',
    visibility: PostVisibility[postDefaultSettings.visibility]
};

export const postAtom = atom(initialPost);

export const postOrchestratorAtom = atom(new PostOrchestrator());

export const initializeAgents = () => {
    const store = getDefaultStore();
    const postOrchestrator = store.get(postOrchestratorAtom);
    const bskySettings = store.get(bskySettingsAtom);
    const mastoSettings = store.get(mastoSettingsAtom);
    return postOrchestrator.initializeAgents([
        new BskyAgentConfiguration(
            bskySettings.handle, bskySettings.appPassword, bskySettings.activated
        ), 
        new MastoAgentConfiguration(
            mastoSettings.url, mastoSettings.appToken, mastoSettings.activated
        )
    ]);
};

initializeAgents();