export const fetchMock = () => {
    const defaultSetup = {
        responseBody: { data: 'abc123' },
        throwError: false,
    };

    const calls = [];
    const setup = structuredClone(defaultSetup);

    const setResponse = (wantedResponse) => {
        Object.keys(wantedResponse).forEach((prop) => (setup[prop] = wantedResponse[prop]));
    };
    const resetCalls = () => (calls.length = 0);
    const reset = () => setResponse(defaultSetup) && resetCalls();

    const fetch = async (url, options) => {
        calls.push({ url, options });
        if (setup.throwError) {
            throw new Error(setup.throwError);
        }
        return new Response(JSON.stringify(setup.responseBody));
    };
    fetch.setResponse = setResponse;
    fetch.reset = reset;
    fetch.getCalls = () => [...calls];
    return fetch;
};
