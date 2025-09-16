class fetchData {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  async fetch() {
    let req = await fetch(this.endpoint);
    let res = await req.json();
    if (res) {
      console.log("the api fetched successfully !");
    } else {
      console.log("failed to fetch !");
    }
    console.log(res);
    return res;
  }
  randomNum(max) {
    return Math.floor(Math.random() * max);
  }
  htmlWriter(h1, p, classNameh1, classNamep) {
    let author = h1;
    let quote = p;
    let select_h1 = document.querySelector(`.${classNameh1}`);
    let select_p = document.querySelector(`.${classNamep}`);
    select_h1.innerHTML = "~ ";
    select_p.innerHTML = `" `;
    select_p.insertAdjacentHTML("beforeend", quote);
    select_h1.insertAdjacentHTML("beforeend", author);
  }
}

let quoteEndpoint = new fetchData("https://dummyjson.com/quotes");

let displayQuote = async () => {
  // animation
  const textElement = document.querySelector(".textPlain");
  const authorElement = document.querySelector(".author");
  textElement.classList.add("fade-out");
  authorElement.classList.add("fade-out");

  // fetcthing, writing and fade out animaition
  setTimeout(async () => {
    let res = await quoteEndpoint.fetch();
    let randint = quoteEndpoint.randomNum(res.quotes.length);
    let quote = res.quotes[randint].quote;
    let author = res.quotes[randint].author;

    textElement.innerHTML = `" ${quote}`;
    authorElement.innerHTML = `~ ${author}`;

    textElement.classList.remove("fade-out");
    authorElement.classList.remove("fade-out");
  }, 400);
};
displayQuote();

document.querySelector("#newQuoteBtn").addEventListener("click", displayQuote);

// fix button size according to the screen width
let generateBtnSize = () => {
  let generateBtn = document.querySelector("#newQuoteBtn");
  let screenWidth = window.screen.width;
  generateBtn.innerHTML =
    screenWidth < 720 ? "Generate !" : "Generate a New One !";
};
generateBtnSize();

// fix the size when resizing
window.addEventListener("resize", generateBtnSize);
