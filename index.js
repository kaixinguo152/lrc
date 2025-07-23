function parseLrc(lrc) {
  let lines = lrc.split("\n");
  let result = [];
  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split("]");
    const timeStr = parts[0].substring(1); // Remove the leading '['
    const obj = {
      time: parseTime(timeStr),
      words: parts[1],
    };
    result.push(obj);
  }
  return result;
}

const lrcDara = parseLrc(lrc);

/**
 * parse time:change "00:01.06" to seconds
 */
function parseTime(timeStr) {
  const parts = timeStr.split(":");
  return +parts[0] * 60 + +parts[1];
}

/**
 * find the current lrc
 */
function findIndex() {
  const currentTime = doms.audio.currentTime;
  for (let i = 0; i < lrcDara.length; i++) {
    if (lrcDara[i].time > currentTime) {
      return i - 1;
    }
  }
  return lrcDara.length - 1;
}

const doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector(".lrc-list"),
  container: document.querySelector(".container"),
};
console.log(doms);

const containerHeight = doms.container.clientHeight;
const liHeight = doms.ul.children[0].clientHeight;
const maxOffset = doms.ul.clientHeight - containerHeight;

function setOffset() {
  const index = findIndex();
  let offset = index * liHeight - containerHeight / 2 + liHeight / 2 + 30;
  // if (offset < 0) {
  //   offset = 30;
  // }
  // if (offset > maxOffset) {
  //   offset = maxOffset;
  // }
  console.log(offset);

  doms.ul.style.transform = `translateY(-${offset}px)`;
}

function setActiveState() {
  const index = findIndex() + 1;

  //remove active state
  let li = doms.ul.querySelector(".active");
  if (li) {
    li.classList.remove("active");
  }

  li = doms.ul.children[index];
  if (li) {
    li.classList.add("active");
  }
}

function createLrcElements() {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < lrcDara.length; i++) {
    const li = document.createElement("li");
    li.textContent = lrcDara[i].words;
    frag.appendChild(li);
  }
  doms.ul.appendChild(frag);
}
createLrcElements();

doms.audio.addEventListener("timeupdate", () => {
  setOffset();
  setActiveState();
});
