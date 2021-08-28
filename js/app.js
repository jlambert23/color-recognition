// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

let html = document.querySelector('html');
let muted;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.onresult = ({ results }) =>
  handleResult(results[results.length - 1][0]);
recognition.onend = () => muted && toggle();
recognition.onerror = console.error;

function handleResult(result) {
  const transcript = result.transcript.trim().toLowerCase();
  console.log(transcript, result.confidence);

  if (colors.includes(transcript)) {
    html.style.backgroundColor = transcript;

    const rgb = window.getComputedStyle(html).backgroundColor.match(/\d+/g);
    mic.style.color = getContrastColor(...rgb);
  }
}

function toggle() {
  const mute = document.getElementById('mute');
  muted = !mute.classList.contains('hidden');

  if (muted) {
    recognition.start();
  } else {
    recognition.stop();
  }

  mute.classList.toggle('hidden');
}

function getContrastColor(r, g, b) {
  // http://stackoverflow.com/a/3943023/112731
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white';
}