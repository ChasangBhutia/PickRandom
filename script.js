const date = new Date();
const year = date.getFullYear();
document.getElementById("year").innerText = year;
const personName = document.getElementById("personName");

document.getElementById("copyButton").addEventListener("click", function () {
  const textToCopy = document.getElementById("quote").innerHTML;

  navigator.clipboard.writeText(textToCopy).then(() => {
      const message = document.getElementById("copyMessage");
      message.innerText = "Copied to clipboard!";
      
      setTimeout(() => {
          message.innerText = "";
      }, 2000);
  }).catch(err => {
      console.error("Failed to copy: ", err);
  });
});


var section = "quote";
var heading = document.getElementById("heading");
heading.innerText = "Quote Generator";
var buttonText = document.querySelector(".quote-btn");
buttonText.innerText = "Get a Quote";
var buttonHeading = document.getElementById("buttonHeading");
buttonHeading.innerText = section;

function jokeSection() {
  section = "joke";
  heading.innerText = "Joke Generator";
  buttonText.innerText = "Get a Joke";
  buttonHeading.innerText = section;
  personName.style.display = "none";
}
function quoteSection() {
  section = "quote";
  heading.innerText = "Quote Generator";
  buttonText.innerText = "Get a Quote";
  buttonHeading.innerText = section;
  personName.style.display = "block";
}
function factsSection() {
  section = "facts";
  heading.innerText = "Facts Generator";
  buttonText.innerText = "Get a Fact";
  buttonHeading.innerText = section;
  personName.style.display = "none";
}

async function generator() {
  if (section === "joke") {
    document.getElementById("quote").innerHTML = "Joke Generating...";
  } else if (section === "quote") {
    document.getElementById("quote").innerHTML = "Quote Generating...";
  } else if (section === "facts") {
    document.getElementById("quote").innerHTML = "Facts Generating...";
  }

  try {
    if (section === "quote") {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        method: "GET",
        headers: {
          "X-Api-Key": "VhZWnc4p1gtrfQcFlv2q5g==k9mRO57zYe4lEekp",
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const result = await response.json();
      document.getElementById("quote").innerHTML = `${result[0].quote}`;
      const name = result[0].author;
      personName.innerText = "--" + name;
    } else if (section === "joke") {
      const url = "https://official-joke-api.appspot.com/random_joke";
      const response = await fetch(url);
      const data = await response.json();

      const jokeText = `${data.setup} - ${data.punchline}`;
      document.getElementById("quote").innerHTML = jokeText;
    } else if (section === "facts") {
      const url = "https://api.api-ninjas.com/v1/facts";
      const headers = {
        "X-Api-Key": "VhZWnc4p1gtrfQcFlv2q5g==k9mRO57zYe4lEekp",
        "Content-Type": "application/json",
      };
      const response = await fetch(url, { method: "GET", headers: headers });
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log(result);

      if (result && result.length > 0) {
        document.getElementById("quote").innerHTML = result[0].fact;
      } else {
        document.getElementById("quote").innerHTML = "No facts found.";
      }
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
