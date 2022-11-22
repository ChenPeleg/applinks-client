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
    it('should fail ', () => {
        const cls = new APPLinksClient('abc');
        expect(7).toBe(9);
    });
});
