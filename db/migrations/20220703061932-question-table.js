'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('Questions', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            created_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Users',
                    key: 'id',
                }
            },
            updated_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Users',
                    key: 'id',
                }
            },
            deleted_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Users',
                    key: 'id',
                }
            }
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('Questions');
    }
};
