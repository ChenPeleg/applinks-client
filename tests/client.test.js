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
    it('load saved records calls fetch correctly', () => {
        const client = new APPLinksClient(appName);
        spyFetch.reset();
        client.loadSavedRecords();
        const calls = spyFetch.getCalls();
        expect(JSON.stringify(calls[0])).toBe(
            `{"url":"${constants.baseUrl}/${constants.recordsApiPath}/${appName}/","options":{"headers":{}}}`
        );
    });
    it('async test ', async () => {
        const client = new APPLinksClient(appName);
        throw 'there was an error accessing somthing';
    });
});
