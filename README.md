# GraphQL with React Course

This contains the projects used for the course [GraphQL with React: The Complete Developers Guide](https://www.udemy.com/graphql-with-react-course/).

Each subdirectory contains a separate project. For each subdirectory follow the current getting started section.

Note: The completed results of course as developed by the author are available at [https://github.com/StephenGrider/GraphQLCasts](https://github.com/StephenGrider/GraphQLCasts) although they may vary significantly from how this project actually eventuates.

### Getting Started

    $ yarn install
    $ yarn start

## users

The user app makes use of a "backend" json service started via `yarn json:server` and accessible
via url `http://127.0.0.1:3000/` or more specifically `http://127.0.0.1:3000/organizations` and
`http://127.0.0.1:3000/users`.

## lyrical

This project was started by importing the project from the started repository
[https://github.com/StephenGrider/Lyrical-GraphQL](https://github.com/StephenGrider/Lyrical-GraphQL).
It makes use of a remotely defined mongo database. Currently using a hosted, free, SAAS offering
[MLAB](https://mlab.com/) configured in `lyrical/setup.sh`.

## auth-graphql

A third project based of starter project [https://github.com/StephenGrider/auth-graphql-starter](https://github.com/StephenGrider/auth-graphql-starter).
