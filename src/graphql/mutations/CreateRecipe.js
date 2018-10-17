import gql from "graphql";

export default gql`
  mutation CreateRecipe(
    $name: String!
    $ingredients: [String!]
    $instructions: [String!]
  ) {
    createRecipe(
      input: {
        name: $name
        ingredients: $ingredients
        instructions: $instructions
      }
    ) {
      id
      name
      ingredients
      instructions
    }
  }
`;
