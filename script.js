
function greetUser() {
    
    console.log("Hello there! Welcome to Nardos Haile's portfolio console. ");
}



function showCurrentDateTime() {
    
    const now = new Date();

    
    console.log("Today's date is: " + now.toDateString());
    console.log("The current time is: " + now.toLocaleTimeString());
}


function getQuote() {
    const quotes = "Code is like humor. When you have to explain it, it's bad."
    return quotes;
}

function getProgrammingTip() {
    const tips = [
        "Always name your variables clearly — future you will thank you.",
        "Comment your code, but explain 'why', not just 'what'.",
        "Test your code often instead of writing everything at once.",
        "Break big problems into smaller, easier problems.",
        "Reading other people's code is a great way to learn new tricks."
    ];

    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
}


function printWelcomeMessage() {
    console.log("=================================================");
    console.log(" Thanks for peeking into the console!");
    console.log(" This portfolio was built with HTML, CSS & JS.");
    console.log("=================================================");
}


function countWords(sentence) {
    const words = sentence.trim().split(" ");

    return words.length;
}

function getLuckyNumber() {
    const luckyNumber = Math.floor(Math.random() * 100) + 1;
    return luckyNumber;
}



greetUser();

showCurrentDateTime();

console.log("Motivational quote: " + getQuote());

console.log("Programming tip: " + getProgrammingTip());

printWelcomeMessage();

console.log("Word count in 'I love building projects': " + countWords("I love building projects"));

console.log("Your lucky number today is: " + getLuckyNumber());

alert("Welcome! Open the console to see some JavaScript output.");
