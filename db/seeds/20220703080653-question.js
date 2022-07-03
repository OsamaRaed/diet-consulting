'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Question', [{
            title: 'What is the best way to learn JavaScript?',
            description: 'lorem ipsum dolor sit amet',
            user_id: 1,
        }, {
            title: 'What is the best way to learn NodeJS?',
            description: 'lorem ipsum dolor sit amet',
            user_id: 1,
        }, {
            title: 'What is the best way to learn ReactJS?',
            description: 'lorem ipsum dolor sit amet',
            user_id: 1,
        }], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Question', null, {});
    }
};
