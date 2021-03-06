'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        return queryInterface.changeColumn('Users', 'role', {
            type: Sequelize.ENUM('patient', 'consultant', 'coordinator'),
            allowNull: false,
        });
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
        return queryInterface.changeColumn('Users', 'role', {
            type: Sequelize.ENUM('patient', 'consultant'),
            allowNull: false,
        });
    }
};
