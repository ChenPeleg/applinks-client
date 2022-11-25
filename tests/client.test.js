import {APPLinksClient, APPLinkUtils} from '../src/client.js';
import {fetchMock} from '../utils/testing/mocks/fetch.mock.js';

/** @type {UserData}*/
const userData = { token: 'deadbeef', lastName: 'Smith', firstName: 'John', username: 'john_smith' };
const appName = 'my-app-name';
const constants = new APPLinkUtils()._debug_get_constants();
const spyFetch = fetchMock();
// eslint-disable-next-line no-undef
globalThis.fetch = spyFetch;

describe('client js class', () => {
    it('instantiate class witout errors', () => {
        const client = new APPLinksClient(appName);
        expect(!!client).toBe(true);
    });
    describe('user data', async () => {
        it('sets user data correctly when all user data exists', () => {
            const client = new APPLinksClient(appName);
            const result = client.setUserData(userData);
            expect(result).toBe(APPLinksClient.Messages.UserWasSet);
        });
        it('doesnt set user data if some data missing ', () => {
            const client = new APPLinksClient(appName);
            const badUSerData = { ...userData, token: false };
            const result = client.setUserData(badUSerData);
            expect(result).toBe(APPLinksClient.Messages.UserWasNotSet);
        });
    });
    describe('loading data', async () => {
        it('load saved records calls fetch correctly', () => {
            const client = new APPLinksClient(appName);
            client.setUserData(userData);
            spyFetch.reset();
            client.loadSavedRecords();
            const calls = spyFetch.getCalls();
            expect(JSON.stringify(calls[0])).toBe(
                `{"url":"${constants.baseUrl}/${constants.recordsApiPath}/${appName}/","options":{"headers":{"Authorization":"Token ${userData.token}"}}}`
            );
        });
        it('load saved records returns data as an object correctly ', async () => {
            const client = new APPLinksClient(appName);
            client.setUserData(userData);
            const dataToSave = 'data to save';
            spyFetch.reset();
            spyFetch.setResponse({ responseBody: { data: dataToSave } });
            const result = await client.loadSavedRecords();
            expect(JSON.stringify(result)).toBe(`{"data":"${dataToSave}"}`);
        });
        it('load saved records raises an error if error happened ', async () => {
            const client = new APPLinksClient(appName);
            client.setUserData(userData);
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
            client.setUserData(userData);
            const savedData = { myData: 'hi there' };
            spyFetch.reset();
            client.savedRecord(savedData);
            const calls = spyFetch.getCalls();
            expect(JSON.stringify(calls[0])).toBe(
                `{"url":"${constants.baseUrl}/${constants.recordsApiPath}/${appName}/","options":{"headers":{"Authorization":"Token ${userData.token}"}}}`
            );
        });
        it('returns data correctly after saving records  ', async () => {
            const client = new APPLinksClient(appName);
            client.setUserData(userData);
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
            client.setUserData(userData);
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
