const graphql = require( 'graphql' );
const UserType = require( './types/user_type' );
const AuthService = require( '../services/auth' );
const { GraphQLNonNull, GraphQLObjectType, GraphQLString } = graphql;

const mutation = new GraphQLObjectType( {
  name: 'Mutation',
  fields: () => ({
    signup: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull( GraphQLString ) },
        password: { type: new GraphQLNonNull( GraphQLString ) }
      },
      /**
       * request is new parameter that represents the request object coming from express
       * Note: Some tutorials will name this "context"
       */
      resolve( parentValue, { email, password }, request ) {
        return AuthService.signup( { email, password, req: request } );
      }
    }
  })
} );

/**
 * Back using ES5 and commonjs module export system
 */
module.exports = mutation;
