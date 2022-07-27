class MongooseQueue {
    static attemptManifest = {
        interval: 1000,
        attemptMultiplier: 1,
        ceil: 120 * 1000, // 120 seconds
    }

    constructor() {
        this.queue = [];
        this.currentAttempt = 0;
        this.currentInterval = 0;
    }

    executeSpecific(index) {
        if (this.queue[index] !== undefined || typeof this.queue[index] === "function") {
            try {
                this.queue[index]();
                this.remove(index);
            } catch (e) {
                console.error(e);
            }
        }
    }

    executeNext() {
        if (this.queue.length > 0) {
            this.executeSpecific(0);
            this.remove(0);
        }
    }

    executeAll() {
        for (let i = 0; i < this.queue.length; i++) {
            this.executeSpecific(i);
            this.remove(i);
        }
    }

    add(action) {
        this.queue.push(action);
        return this.queue.length;
    }

    addAndExecute(action) {
        // if there is an error while executing the action, 
        // it will remain in the queue and will be executed again in the future
        this.executeSpecific(this.add(action));
    }

    remove(index) {
        this.queue.splice(index, 1);
    }

    destroy() {
        this.queue = [];
    }
}

module.exports = MongooseQueue;