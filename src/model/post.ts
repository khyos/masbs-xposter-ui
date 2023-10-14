import { atom } from 'jotai';
import { Post, PostVisibility, PostLanguage } from 'masbs-xposter';

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
