import "./CookingInstructions.css";

function CookingInsturctions(props) {
  const { cookingInstructions } = props;

  return (
    <div className="COOKING_INSTRUCTIONS">
      <h2>Cooking Instructions</h2>

      <div className="cooking-instructions_container">
        {
          cookingInstructions.map((instruction, i) => {
            return (
              <div key={i}>
                <p>{`${i + 1}. ${instruction}`}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default CookingInsturctions;