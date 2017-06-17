const graphql = require( 'graphql' );
const { GraphQLString, GraphQLObjectType } = graphql;

const RootQueryType = new GraphQLObjectType( {
  name: 'RootQueryType',
  fields: {
    placeholder: { type: GraphQLString }
  }
} );

module.exports = RootQueryType;
