let timeoutId; // To store the timeout ID

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState == "visible") {
    document.title = "Art pixel";
    clearTimeout(timeoutId);
  } else {
    scrolltitle();
  }
});

function scrolltitle() {
  let car = "🚗";
  let restOfMsg = "▄░_▄▒░▄█▄█▒▄█_";
  let position = 0;

  function updateTitle() {
    let scrolledTitle =
      car +
      " " +
      restOfMsg.substring(position) +
      restOfMsg.substring(0, position);
    document.title = scrolledTitle;
    position++;
    if (position >= restOfMsg.length) position = 0;
    // Store the timeout ID
    timeoutId = setTimeout(updateTitle, 200);
  }

  updateTitle();
}
