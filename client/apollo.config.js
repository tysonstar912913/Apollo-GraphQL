module.exports = {
  client: {
    service: 'Hello-world',
    includes: ["./src/**/*.js"],
    excludes: ["**/__tests__/**"],
    url: 'http://localhost:4000/graphql'
  },
};
