const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type TestData {
        text:String!
        views:Int!
    }
    type Post {
        id:ID!
        title:String!
        content:String!
        imageUrl:String!
        creator:String!
        createdAt:String!
        updatedAt:String!
    }
    type User {
        id:ID!
        name:String!
        email:String!
        password:String
        status:String!
        posts:[Post!]!
    }
   
    type LoggedIn {
        token:String!
        name:String!
    }
    type PostsLists {
        post:[Post!]!
        totalCount:Int!
    }
    input UserInputData {
        email:String!
        name:String!
        password:String!
    }
    input PostInputData {
        content:String!
        title:String!
        imageUrl:String!
    }

    type RootQuery {
        hello:TestData!
        login(email:String!,password:String!): LoggedIn!
        postList(page:Int): PostsLists!
        postById(id:ID!): Post!
    }
    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post!
        updatePost(id:ID!,postInput: PostInputData): Post!
        deletePost(id:ID!): Boolean!
    }
    type LoginMutation {
        login(email:String!,password:String!): LoggedIn!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);