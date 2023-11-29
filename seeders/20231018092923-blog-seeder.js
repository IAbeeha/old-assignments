"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "blog",
      [
        {
          title: "Representation of a Person’s Cognition",
          content:
            "So, aside from Persona the video game, Persona also exists as a term in application design. Let’s say you want to make an website that caters to a certain people of interest. That’s a vague view point right? “A certain people of interest” is not a concrete measurement to make your website as user-friendly as possible. Persona exists to simulate people that will use the website you’re currently making.Persona is a user representation in a form of a fictional individual that contains summary of expectation, goals, characteristics, tasks, environment, and potential threats of a real user. Persona is developed by Alan Cooper in 1980s. So, the idea is to make an imaginary character that has real traits of a real human being using what you’re creating. With this approach, developers can specifically design their applications to their respective clients. When creating user persona, one must analyze and categorize the intended user data first and adapt it to the application design.",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Don’t Forget to Level Up Agility!",
          content:
            "In software development cycles, especially now, we need to make sure that our working environment not stagnant and ready for changes. Like the analogy in the title, Agile does that and more. Agile is a practice that promotes continuous iteration of development and testing throughout the software development lifecycle. Agile emphasize on 4 values, those are: Individual and team interactions over processes and tools Working software over comprehensive documentation Customer collaboration over contract negotiation Responding to change over following a plan Comparing Agile with older methodologies, in short, it has all of the best practices and combine it all together in a brand new more loose concept. Since older methods stick to their pre-made rules of doing things in order, Agile changes all that with more leisure with the swift nature of it’s values. We call it Agile Methodology because it is not a sequence of method and we are still learning to master it. Now we enter one of- if not the most popular Agile framework, Scrum.",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Design Pattern",
          content:
            "Another thing that can prevent code smells from happening is Design Pattern. Design Pattern is a reusable solution to a commonly occurring problem. These are patterns that help developers Layout their code to avoid problems as much as possible. There are many design patterns since it is not a finished design that is concrete. I’ll be only explaining one particular Design Pattern that is widely used on frameworks and used in me and my team Software Development Project course, the Model-View-Controller design pattern.",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The ChatGPT Hype Is Over",
          content:
            "I’ve written an article analyzing how Google Bard will destroy ChatGPT because it’s a long-term game, and Google has the upper hand in terms of market dominance. ChatGPT has a better product, but that doesn’t mean they’ll win the long race. This was quite the trending article reaching 178,000 people. There were quite the mixed emotions towards it. Some agreed that Google had the upper hand. Others think that ChatGPT has a “first-movers advantage.” Now let’s resume the conversation. Ever since then, Google has been developing and waiting for the hype to fade. Their stock has been on the rise because many believe in their AI investments. Finally, OpenAI made a few moves that made me believe that they’re moving more toward the losing side of the race. Let me elaborate; it’ll be fun. ",
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
