class ServiceManager {
    constructor() {
        this.services = {};

        this.register = this.register.bind(this);
        this.get = this.get.bind(this);
        this.getAll = this.getAll.bind(this);
        this.unregister = this.unregister.bind(this);
    }
    
    register(name, service) {
        this.services[name] = service;
        return this.services[name];
    }
    
    get(name) {
        return this.services[name];
    }

    getAll() {
        return this.services;
    }

    unregister(name) {
        delete this.services[name];
    }
}

module.exports = ServiceManager;