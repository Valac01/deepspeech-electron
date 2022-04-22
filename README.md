# Electron app using DeepSpeech

This app generates text from audio file.

Audio file should be in `wav` file format with the sample rate of `16000` this sample rate is recommended for the model.

Created with

- Nodejs `v12.13.0`

DeepSpeech currenly supports upto nodejs v13, but I was facing some issue with the electron version and node version 13 taken from the [DeepSpeech Electron example](https://github.com/mozilla/DeepSpeech-examples/tree/r0.9/electron), so for now nodejs v12 will do.

## Download the prebuild models to use

You need to download `model` and `scorer` files. You can find them in the [release page](https://github.com/mozilla/DeepSpeech/releases) of DeepSpeech

```
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm

wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer
```

After downloading these files put it inside the `models` folder

```bash
# your folder structure should look like this

.
└── models
    └── deepspeech-0.9.3-models.pbmm
    └── deepspeech-0.9.3-models.scorer
└── index.js
```

Install Dependencies

```bash
npm install
```

Rebuild the native packages for electron [as shown here](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules#installing-modules-and-rebuilding-for-electron)

```bash
./node_modules/.bin/electron-rebuild
```

Start the app

```bash
npm run start
```
