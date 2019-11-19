
const resolvers = {
  Query: {
    collaborators() {
      return [
        {
          id: 'abc1234',
          name: 'testing'
        },
        {
          id: 'WHAT',
          name: 'saldfkjasdfkl'
        }
      ];
    }
  }
};

module.exports = resolvers;
