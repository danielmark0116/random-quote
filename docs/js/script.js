const quoteUrl =
  'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
const tweetUrl = 'https://twitter.com/intent/tweet?text=';
const corsFix = 'https://cors-anywhere.herokuapp.com/';

function generateQuote() {
  document.querySelector('#result-quote').innerHTML =
    '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
  document.querySelector('#result-author').innerHTML = '';
  fetch(`${corsFix}${quoteUrl}`, { cache: 'no-store' })
    .then(res => res.json())

    .then(data => {
      generateTweet(data[0]);
    })
    .catch(err => {
      console.log(err);
      document.querySelector('#result-quote').innerHTML = 'Error';
    });
}

function generateTweet(input) {
  const quoteContent = input.content;
  let quoteAuthor = input.title;
  const rawText = document.createElement('div');
  rawText.innerHTML = quoteContent;
  if (!quoteAuthor) {
    quoteAuthor = 'Unknown Author';
  }
  const tweetContent = `Quote of the day: "${rawText.innerText.trim()}" by ${quoteAuthor}`;

  if (tweetContent.length > 140) {
    generateQuote();
  } else {
    document.querySelector('#result-quote').innerHTML = `"${
      rawText.innerText
    }"`;
    document.querySelector('#result-author').innerHTML = `by ${quoteAuthor}`;
    document
      .querySelector('#tweet')
      .setAttribute('href', `${tweetUrl}${tweetContent}`);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  generateQuote();
  document
    .querySelector('#generate-quote')
    .addEventListener('click', function() {
      generateQuote();
    });
});
