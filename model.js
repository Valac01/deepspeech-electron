const DeepSpeech = require("deepspeech");
const path = require("path");
const fs = require("fs");
const wav = require("wav");

const modelPath = path.join(__dirname, "/models/deepspeech-0.9.3-models.pbmm");
const scorerPath = path.join(
  __dirname,
  "/models/deepspeech-0.9.3-models.scorer"
);

console.log(modelPath);
console.log(scorerPath);

let model = new DeepSpeech.Model(modelPath);

let desiredSampleRate = model.sampleRate();

model.enableExternalScorer(scorerPath);

console.log(desiredSampleRate);

const modelResult = async (audioFile) => {
  const result = await recognizeWav(audioFile, model);
  return result;
};

function recognizeWav(path, model) {
  return new Promise(function (resolve, reject) {
    try {
      let modelStream = model.createStream();
      const bufferSize = 512;
      const file = fs.createReadStream(path, { highWaterMark: bufferSize });
      const reader = new wav.Reader();
      reader.on("format", function (format) {
        if (format.sampleRate !== model.sampleRate()) {
          reject(new Error("invalid sample rate: " + format.sampleRate));
        }
        reader.on("end", function () {
          const results = modelStream.finishStream();
          resolve(results);
        });
        reader.on("data", function (data) {
          modelStream.feedAudioContent(data);
        });
      });
      file.pipe(reader);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  modelResult,
};
