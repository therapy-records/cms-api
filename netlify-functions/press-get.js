const { request, gql } = require('graphql-request');
const graphqlConfig = require('../config/graphql');

const ROOT_URL = process.env.ROOT_URL;

exports.handler = async () => {
  const query = gql`
    {
      press {
        _id
        author
        title
        excerpt
        releaseDate
      }
    }
  `;

  const url = `${ROOT_URL}${graphqlConfig.graphqlPath}`;
  const data = await request(url, query);

  if (data) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ message: 'Error querying' })
  };
};
