'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('Answer', {
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
            recommendations: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            is_draft: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            question_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Question',
                    key: 'id',
                },
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id',
                }
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
        }, {
            uniqueKeys: {
                unique_draft: {
                    unique: true,
                    fields: ['question_id', 'user_id', 'created_at'],
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
        await queryInterface.dropTable('Answer');
    }
};
