const readDirP = require('readdirp');

const ignoredFilesRE = /(part-\d\d\d\.md$)|(^\d\d-certificates)/i;
const challengeDir = __dirname + '/../../../../curriculum/challenges/english';

const displayCurriculumFiles = file => {
  const match = file.path.match(ignoredFilesRE);
  if (!match) {
    console.log(file.path);
  }
};

readDirP(challengeDir, { fileFilter: ['*.md'], type: 'files' }).on(
  'data',
  displayCurriculumFiles
);
