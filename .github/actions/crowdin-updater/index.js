const core = require("@actions/core");
const { getOutputFromCommand, defineFileChanges } = require('./utils');
const learnDir = 'curriculum/challenges/english';

const action = async () => {
  let changedCurriculumFiles = [];
  try {
    const commit = core.getInput('commit-sha');
    core.info(`commit # pushed: ${commit}`);
    const diffCommand = `git diff --name-status -m -M -C ${commit}^..${commit} -- ${learnDir}`;
    const diff = await getOutputFromCommand(diffCommand);
    console.log(`diff\n${diff}`);

    const files = diff && diff.trim().split('\n');
    if (files && files.length) {
      changedCurriculumFiles = await defineFileChanges(files, commit);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
  console.log(JSON.stringify(changedCurriculumFiles, null, 2));
  core.info('action complete');
  return null;
};

action();