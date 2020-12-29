const util = require('util');
const exec = util.promisify(require('child_process').exec);

const getOutputFromCommand = async (command) => {
  try {
    const { stdout } = await exec(command);
    return stdout;
  }
  catch (err) {
    console.log('command error');
    console.log(command + '\n');
    console.log(err.stderr);
    return null;
  };
};

const defineFileChanges = async (files, commit) => {
  const learnRegex = /^curriculum\/challenges\/english\/(?!.+part-\d\d\d\.md$)(?!\d\d-certificates).*/i;
  const changes = [];
  for (file of files) {
    let deleteFile, updateFile;
    let [statusCode, origFilename, newFilename] = file.split(/\s+/);
    // only need first letter of change status code
    statusCode = statusCode[0];
    switch (statusCode) {
      case 'A':
      case 'M':
        updateFile = origFilename;
        break;
      case 'D':
        deleteFile = origFilename;
        break;
      case 'R':
        deleteFile = origFilename;
        updateFile = newFilename;
        break;
      case 'C':
        updateFile = newFilename;
        break;
    }
    let fileChange = {};
    if (deleteFile) {
      fileChange = { ...fileChange, deleteFile };
    }
    if (updateFile) {
      let command = `git show -C100% -M100% -m ${commit}:${updateFile}`;
      const content = await getOutputFromCommand(command);
      fileChange = { ...fileChange, updateFile, content };
    }
    changes.push(fileChange);
  }
  return changes
    .filter(({ updateFile, deleteFile }) => {
      if (updateFile && updateFile.match(learnRegex)) {
        return true;
      }
      if (deleteFile && deleteFile.match(learnRegex)) {
        return true;
      }
      return false;
    });
};

module.exports = {
  getOutputFromCommand,
  defineFileChanges
};