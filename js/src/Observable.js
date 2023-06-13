class Observable {

    constructor() {
        this.events = {};
    }

    on(eventName, callback) {

        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);
    }

    trigger(eventName, ...params) {

        if (this.events[eventName]) {

            for (const callback of this.events[eventName]) {

                if (callback) {
                    callback(...params);
                }
            }
        }
    }
}
