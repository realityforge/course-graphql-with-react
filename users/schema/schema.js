const graphql = require( 'graphql' );
const axios = require( 'axios' );

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

function backendUrl( path ) {
  return `http://localhost:3000/${path}`;
}

function queryBackend( path ) {
  return axios.get( backendUrl( path ) ).
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

const mutation = new GraphQLObjectType( {
  name: 'Mutation',
  fields: {
    addUser: {
      //It should be noted that the type (a.k.a. return type) may not
      // be the same as the type modified but in this case it is.
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull( GraphQLString ) },
        lastName: { type: new GraphQLNonNull( GraphQLString ) },
        age: { type: new GraphQLNonNull( GraphQLInt ) },
        organizationId: { type: GraphQLString }
      },
      resolve( parentValue, { firstName, lastName, age, organizationId } ) {
        return axios.post( backendUrl( 'users' ),
          { firstName, lastName, age, organizationId } ).
                     then( result => result.data );
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull( GraphQLString ) }
      },
      resolve( parentValue, { id } ) {
        return axios.delete( backendUrl( `users/${id}` ) ).
                     then( result => result.data );
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull( GraphQLString ) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        organizationId: { type: GraphQLString }
      },
      resolve( parentValue, args ) {
/*
        const { id, firstName, lastName, age, organizationId } = args;
        let args = {};
        if( firstName !== undefined ) {
          args.firstName = firstName;
        }
        if( lastName !== undefined ) {
          args.lastName = lastName;
        }
        if( age !== undefined ) {
          args.age = age;
        }
        if( organizationId !== undefined ) {
          args.organizationId = organizationId;
        }
*/
        //args can be passed in directly as it only includes parameters
        // passed by user
        return axios.patch( backendUrl( `users/${id}` ), args ).
                     then( result => result.data );
      }
    }

  }
} );

module.exports = new GraphQLSchema( {
  query: RootQuery,
  mutation
} );
