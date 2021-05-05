import {Handler, registerHandlers} from './paged.esm.js';

class myHandler extends Handler {
    beforeParsed(content) {

    };
}

registerHandlers(myHandler);


