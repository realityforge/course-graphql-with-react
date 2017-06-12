const graphql = require( 'graphql' );
const axios = require( 'axios' );

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;

function queryBackend( path ) {
  return axios.get( `http://localhost:3000/${path}` ).
               //Have to get data internal part of response because that is the data that returns data
               then( response => response.data );
}

const OrganizationType = new GraphQLObjectType( {
  name: 'Organization',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList( UserType ),

      //Users does not directly exist so we need to add resolve
      resolve( parentValue, args ) {
        return queryBackend( `organizations/${parentValue.id}/users` );
      }
    }
  })
} );

const UserType = new GraphQLObjectType( {
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    organization: {
      type: OrganizationType,
      // resolve is required when the field does not have a direct alignment
      // with data which it resolved to. Our underlying model has organizationId
      // while our graphql schema has organization "reference"
      resolve( parentValue, args ) {
        //parentValue is the object that represents outer user object.
        //So we can grab the organizationId from underlying model and translate it
        // into organization
        return queryBackend( `organizations/${parentValue.organizationId}` );
      }
    }
  })
} );

const RootQuery = new GraphQLObjectType( {
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve( parentValue, args ) {
        return queryBackend( `users/${args.id}` );
      }
    },
    organization: {
      type: OrganizationType,
      args: { id: { type: GraphQLString } },
      resolve( parentValue, args ) {
        return queryBackend( `organizations/${args.id}` );
      }
    }
  }
} );

module.exports = new GraphQLSchema( {
  query: RootQuery
} );
