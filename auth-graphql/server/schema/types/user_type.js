const graphql = require( 'graphql' );
const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = graphql;

const UserType = new GraphQLObjectType( {
  name: 'UserType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull( GraphQLID )
    },
    email: {
      type: new GraphQLNonNull( GraphQLString )
    }
  })
} );

module.exports = UserType;
