const { sequelize } = require('../../app/models');

module.exports = async () => {
    const models = Object.keys(sequelize.models);

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });

    let model = null;
    for (let index = 0; index < models.length; index++) {
        model = models[index];
        await sequelize.models[model].destroy({ truncate: true, cascade: true, force: true });
    }

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
};
