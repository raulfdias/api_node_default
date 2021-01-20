class RepositoryInterface {
    constructor() {
        if (!this.findById) {
            throw new Error('This repository needs to have the method: findById');
        }
        if (!this.findAll) {
            throw new Error('This repository needs to have the method: findAll');
        }
        if (!this.create) {
            throw new Error('This repository needs to have the method: create');
        }
        if (!this.update) {
            throw new Error('This repository needs to have the method: update');
        }
        if (!this.destroy) {
            throw new Error('This repository needs to have the method: destroy');
        }
    }
}

module.exports = new RepositoryInterface();
