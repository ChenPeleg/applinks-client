import { APPLinksClient } from '../src/client.js';

describe('client js class', () => {
    it('instantiate class', () => {
        const cls = new APPLinksClient('abc');
        expect(!!cls).toBe(true);
    });
    it('instantiate class', () => {
        const cls = new APPLinksClient('abc');
        expect(!!cls).toBe(true);
    });
    it('async test ', async () => {
        const result = await fetch('http://google.co.il');
        console.log(result);
    });
});
