import gql from "graphql";

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
