import { APPLinksClient, APPLinkUtils } from '../src/client.js';
import { fetchMock } from '../utils/testing/mocks/fetch.mock.js';

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
    describe('loading data', async () => {
        it('load saved records calls fetch correctly', () => {
            const client = new APPLinksClient(appName);
            spyFetch.reset();
            client.loadSavedRecords();
            const calls = spyFetch.getCalls();
            expect(JSON.stringify(calls[0])).toBe(
                `{"url":"${constants.baseUrl}/${constants.recordsApiPath}/${appName}/","options":{"headers":{}}}`
            );
        });
        it('load saved records returns data as an object correctly ', async () => {
            const client = new APPLinksClient(appName);
            const dataToSave = 'data to save';
            spyFetch.reset();
            spyFetch.setResponse({ responseBody: { data: dataToSave } });
            const result = await client.loadSavedRecords();
            expect(JSON.stringify(result)).toBe(`{"data":"${dataToSave}"}`);
        });
        it('load saved records raises an error if error happened ', async () => {
            const client = new APPLinksClient(appName);
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
});
