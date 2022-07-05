'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('Vote', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            vote: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id',
                }
            },
            answer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Answer',
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
        }, {
            uniqueKeys: {
                vote_unique: {
                    unique: true,
                    fields: ['user_id', 'answer_id'],
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
        await queryInterface.dropTable('Favorite');
    }
};
