import { AppState } from './AppState';
import { Store, createStore } from 'redux';
import { InjectionToken } from '@angular/core';
import app from './Reducers';


function createAppStore(): Store<AppState> {
    return createStore(app);
}

export const AppStore = new InjectionToken("App.store");
export const appStoreProviders = [
    { provide: AppStore, useFactory: createAppStore}
]