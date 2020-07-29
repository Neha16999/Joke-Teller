const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() 
{
  button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) 
{
   // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    key: '7ffc6e3b43894c6da5676e40092ff0de',
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() 
{
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
  try
   {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) 
    {
      joke = `${data.setup} ... ${data.delivery}`;
    } 
    else
    {
      joke = data.joke;
    }
    // Passing Joke to VoiceRSS API
    tellMe(joke);
    // Disable Button
    toggleButton();
  } 
  catch (error)
  {
   console.log("Something went wrong..",error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);