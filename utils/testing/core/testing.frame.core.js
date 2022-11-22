import { TestFrameWorkGlobals } from './testing.frame.globals.js';

export class GlobalData {
    /**@type {TestEvent[]} */
    tests = [];
    configData = {};

    constructor() {}
}

class TestingFramework {
    constructor() {
        this.globalData = new GlobalData();
        this.testFrameWorkGlobals = new TestFrameWorkGlobals(this.globalData);
    }

    init() {
        // eslint-disable-next-line no-undef
        globalThis.expect = this.testFrameWorkGlobals.expect;
        globalThis.it = this.testFrameWorkGlobals.it;
        globalThis.describe = this.testFrameWorkGlobals.describe;
    }
}

export default TestingFramework;
