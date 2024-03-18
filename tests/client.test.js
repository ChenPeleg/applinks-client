import {APPLinksClient, APPLinkUtils} from '../src/client.js';
import {fetchMock} from '../utils/testing/mocks/fetch.mock.js';
import {ApplinksUtilsMock} from './mocks/ApplinksUtils.mock.js';
import {LocalStorageMock} from '../utils/testing/mocks/localStorage.mock.js';

/** @type {UserData}*/
const userData = {
    token: 'deadbeef',
    id: 'Smith',
    fullName: 'John',
    username: 'john_smith',
    refreshToken: 'beefdead',
};
const appName = 'my-app-name';
const constants = new APPLinkUtils()._debug_get_constants();
const spyFetch = fetchMock();
// eslint-disable-next-line no-undef
globalThis.fetch = spyFetch;
// eslint-disable-next-line no-undef
globalThis.localStorage = new LocalStorageMock();

describe('client js class', () => {
    it('instantiate class witout errors', () => {
        const client = new APPLinksClient(appName, {
            appLinkUtils: ApplinksUtilsMock,
            useLocalStorage: false,
            useDefaultPanel: false,
        });
        expect(!!client).toBe(true);
    });
    describe('user data', async () => {
        it('sets user data correctly when all user data exists', () => {
            const client = new APPLinksClient(appName);
            const result = client.innerMethods.setUserData(userData);
            expect(result).toBe(APPLinksClient.Messages.UserWasSet);
            expect(client.userStatus).toBe(APPLinksClient.Messages.UserWasSet);
        });
        it('doesnt set user data if some data missing ', () => {
            const client = new APPLinksClient(appName);
            const badUSerData = { ...userData, token: false };
            const result = client.innerMethods.setUserData(badUSerData);
            expect(result).toBe(APPLinksClient.Messages.UserWasNotSet);
        });
    });
    describe('loading data', async () => {
        it('load saved records calls fetch correctly', () => {
            const client = new APPLinksClient(appName);
            client.innerMethods.setUserData(userData);
            spyFetch.reset();
            client.loadSavedRecords();
            const calls = spyFetch.getCalls();
            const call = calls[0];
            expect(call.url).toBe(`${constants.baseUrl}/${constants.recordsApiPath}?appId=${appName}`);
            expect(call.options.headers.Authorization).toBe(`Token ${userData.token}`);
            expect(call.options.headers['Content-Type']).toBe('application/json');
            expect(call.options.mode).toBe('cors');
            expect(call.options.cache).toBe('no-cache');
            expect(call.options.credentials).toBe('same-origin');
            expect(call.options.redirect).toBe('follow');
            expect(call.options.referrerPolicy).toBe('no-referrer');
        });
        it('load saved records returns data as an object correctly ', async () => {
            const client = new APPLinksClient(appName);
            client.innerMethods.setUserData(userData);
            const dataToSave = '{"record": "data to save"}';
            spyFetch.reset();
            const returnBody = {
                Data: dataToSave,
                Name: appName,
                UserId: userData.id,
                AppId: appName,
                Timestamp: new Date().toISOString(),
            };

            spyFetch.setResponse({ responseBody: returnBody });
            const result = await client.loadSavedRecords();
            expect(result.app_data).toBe(dataToSave);
            expect(result.user_id).toBe(userData.id);
        });
        it('load saved records raises an error if error happened ', async () => {
            const client = new APPLinksClient(appName);
            client.innerMethods.setUserData(userData);
            const errorMessage = 'no response from server';
            spyFetch.reset();
            spyFetch.setResponse({ throwError: errorMessage });
            try {
                const result = await client.loadSavedRecords();
            } catch (err) {
                expect(err.toString().includes(errorMessage)).toBe(true);
                return;
            }
            throw new Error('load save records did not throw an error');
        });
    });
    describe('saving data', async () => {
        it('saves records calls fetch correctly', () => {
            const client = new APPLinksClient(appName);
            client.innerMethods.setUserData(userData);
            const savedData = { myData: 'hi there' };
            spyFetch.reset();
            client.savedRecord(savedData);
            const calls = spyFetch.getCalls();
            const call = calls[0];
            expect(call.url).toBe(`${constants.baseUrl}/${constants.recordsApiPath}?appId=${appName}`);
            expect(call.options.headers.Authorization).toBe(`Token ${userData.token}`);
            expect(call.options.headers['Content-Type']).toBe('application/json');
        });
        it('returns data correctly after saving records  ', async () => {
            const client = new APPLinksClient(appName);
            client.innerMethods.setUserData(userData);
            const dataToSave = 'data to save';
            const savedData = { data: dataToSave };
            spyFetch.reset();
            spyFetch.setResponse({ responseBody: { data: dataToSave } });
            const result = await client.savedRecord(savedData);
            expect(JSON.stringify(result)).toBe(`{"data":"${dataToSave}"}`);
        });
        it('load saved records raises an error if error happened ', async () => {
            const client = new APPLinksClient(appName);
            const savedData = { myData: 'hi there' };
            client.innerMethods.setUserData(userData);
            const errorMessage = 'no response from server';
            spyFetch.reset();
            spyFetch.setResponse({ throwError: errorMessage });
            try {
                const result = await client.savedRecord(savedData);
            } catch (err) {
                expect(err.toString().includes(errorMessage)).toBe(true);
                return;
            }
            throw new Error('load save records did not throw an error');
        });
    });
});
