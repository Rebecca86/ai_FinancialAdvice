function displayAnimatedAdvice(response) {
  let adviceElement = document.querySelector("#financial-advice-content");
  adviceElement.classList.remove("blinking-text");
  new Typewriter("#financial-advice-content", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
  });
}

function generateAdvice(arrInputs) {
  //   alert(character);
  let apiKey = "f300cf6ad21c42dc4f0oefe03b237t4a";
  let context =
    "You are brilliant Financial Advisor. Please give 3 practices on Fiancial Advice.";
  let prompt = `Please provide advice when I am financial ${arrInputs[0]} and my goal is to achieve ${arrInputs[1]}?`;

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
  let adviceElement = document.querySelector("#financial-advice-content");
  adviceElement.classList.add("blinking-text");
  adviceElement.innerHTML =
    "The AI is searching for an financial advice for you....";
  axios.get(apiUrl).then(displayAnimatedAdvice);
}

let userInputArray = []; //form an array - public

//let h2Element = document.querySelector("#ask-h2");
document.addEventListener("DOMContentLoaded", function () {
  //search input
  let userInputText = document.querySelector("#search-input");
  //button
  let submitBtn = document.getElementById("search-button");

  submitBtn.addEventListener("click", function () {
    //get the 1st input - push to the array
    //change the question H2, example, and the button text value
    userInputArray.push(userInputText.value);
    userInputText.value = "";
    if (userInputArray.length === 1) {
      userInputText.placeholder = "State your financial goal....";
      document.querySelector("#ask-h2").innerHTML =
        "What is your Financial Goal?";
      document.querySelector("#search-button").value = "Search";
      document.querySelector("#example").innerHTML =
        "eg: Debt free, multi bilionaire, passive income";
    } else if (userInputArray.length === 2) {
      userInputArray.push(userInputText);
      let formSectionElement = document.querySelector("#formSection");
      formSectionElement.style.display = "none";
      let adviceSectionElement = document.querySelector(
        "#financial-advice-container"
      );
      adviceSectionElement.classList.remove("displayNone");
      generateAdvice(userInputArray);
    }
  });
});
