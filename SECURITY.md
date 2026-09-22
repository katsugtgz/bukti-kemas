# Security

Bukti Kemas stores packing video on the seller's computer. A build must not upload recordings, catalog rows, or receipt numbers.

## Report a vulnerability

Use GitHub private vulnerability reporting:

https://github.com/katsugtgz/bukti-kemas/security/advisories/new

Do not open a public issue for a security bug, and do not include a recording or a real receipt number in the report.

## What is in scope

- The app sending video, audio, or receipt data off the machine
- A service worker caching video
- A second tab recording when one tab already holds the camera
- Folder permission used for anything other than the packing archive

## What is out of scope

- A seller choosing a weak folder
- Marketplace dispute policy
- Browser bugs in `MediaRecorder` or the file picker
