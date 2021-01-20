const RepositoryInterface = require('../interfaces/repositories/RepositoryInterface')
const { Aluno } = require('../models')

class AlunoRepository extends RepositoryInterface {
    constructor() {
        super()
    }

    findById() { }
    findAll() { }
    create() { }
    update() { }
    destroy() { }
}

module.exports = new AlunoRepository()
