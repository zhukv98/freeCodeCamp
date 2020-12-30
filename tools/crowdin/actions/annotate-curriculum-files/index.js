const readDirP = require('readdirp');

const learnRegex = /curriculum\/challenges\/english\/(?!.+part-\d\d\d\.md$)(?!\d\d-certificates).*/i;
const challengeDir = '../../../../curriculum/challenges/english';

readDirP(challengeDir, {fileFilter: ['*.md'] }).on('data', file => {
  if (file.stat.isFile()) {
    console.log(file.path);
    const match = file.path.match(learnRegex);
    if (match) {
      console.log(file.path);
    }
  }
});
