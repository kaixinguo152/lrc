function parseLrc() {
  let lines = lrc.split("\n");
  let lrcs = [];
  for (let i = 0; i < lrcs.length; i++) {
    const parts = lines.split("]");
    const timeStr = parts[0].substring(1); // Remove the leading '['
    const obj = {
      time: parseTime(timeStr),
      words: parts[1],
    };
    lrcs.push(obj);
  }
  return lrcs;
}

const lrcDara = parseLrc();
console.log(lrcDara);

const doms = {
  sudio: document.querySelector("audio"),
  ul: document.querySelector(".lrc-list"),
};

function parseTime(timeStr) {
  return +timeStr.split(":")[0] * 60 + +timeStr.split(":")[1];
}

const fragment = document.createDocumentFragment();
for (let i = 0; i < lrcs.length; i++) {
  const li = document.createElement("li");
  li.innerText = lrcs[i].words;
  //   li.dataset.time = lrcs[i].time;
  fragment.appendChild(li);
}
document.querySelector(".lrc-list").appendChild(fragment);
