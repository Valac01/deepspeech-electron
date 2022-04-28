const selectFileBtn = document.querySelector("#select-file-btn");
const audioEl = document.querySelector("#audio");
const transcribedText = document.querySelector("#transcibed-text");
const loading = document.querySelector("#loading");

selectFileBtn.addEventListener("click", () => {
  window.ipcRenderer.send("open-dialog");
});

window.ipcRenderer.on("file-selected", (_, args) => {
  audioEl.style.display = "block";
  loading.style.display = "block";
  console.log(args);
  const sourceNode = document.createElement("source");
  sourceNode.setAttribute("src", `file://${args}`);
  sourceNode.setAttribute("type", "audio/wav");
  const audioElChildNode = audioEl.childNodes;
  if (audioElChildNode.length === 0) {
    console.log("append child");
    audioEl.appendChild(sourceNode);
  } else {
    console.log("replace child");
    audioEl.removeChild(audioElChildNode[0]);
    audioEl.appendChild(sourceNode);
  }
});

window.ipcRenderer.on("file-error", (_, args) => {
  loading.style.display = "none";
  console.error(args);
});

window.ipcRenderer.on("transcibe-text", (_, args) => {
  loading.style.display = "none";
  transcribedText.style.display = "block";
  transcribedText.textContent = args;
  audioEl.load();
  audioEl.play();
  console.log("text: ", args);
});
