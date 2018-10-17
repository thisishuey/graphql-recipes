import gql from "graphql-tag";

export default gql`
  subscription OnCreateRecipe {
    onCreateRecipe {
      id
      name
      ingredients
      instructions
    }
  }
`;
