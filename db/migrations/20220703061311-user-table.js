'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('User', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            role: {
                type: Sequelize.enum('patient', 'consultant'),
                allowNull: false,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            middle_name: {
                type: Sequelize.STRING,
                allowNull: true,
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
                    model: 'User',
                    key: 'id',
                }
            },
            updated_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'User',
                    key: 'id',
                }
            },

            deleted_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'User',
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
        await queryInterface.dropTable('User');
    }
};
