import gql from "graphql-tag";

export default gql`
  query ListRecipes {
    listRecipes {
      items {
        id
        name
        ingredients
        instructions
      }
    }
  }
`;
