const matter = require('gray-matter');
const fse = require('fs-extra');

const {
  addFile,
  updateFile,
  getFiles,
  deleteFile,
  getDirs,
  createDirs
} = require('./utils/files');

const { updateFileStrings } = require('./utils/strings');
// const delay = require('./utils/delay');

const { annotate } = require('../formatter/translation-annotation/annotate');

const addNewFile = async (projectId, filename, annotatedContent) => {
  const crowdinDirs = await getDirs(projectId);
  const splitFilePath = filename.split('/');
  const newFilename = splitFilePath.pop();
  const parentDirId = await createDirs(crowdinDirs, splitFilePath.join('/'));
  const response = await addFile(
    projectId,
    newFilename,
    annotatedContent,
    parentDirId
  );

  const { id: fileId } = response;
  const {
    data: { title: challengeTitle }
  } = matter(annotatedContent);
  await updateFileStrings({ projectId, fileId, challengeTitle });
};

const updateExistingFile = async (projectId, fileId, annotatedContent) => {
  await updateFile(projectId, fileId, annotatedContent);

  const {
    data: { title: challengeTitle }
  } = matter(annotatedContent);
  await updateFileStrings({ projectId, fileId, challengeTitle });
};

const updateCrowdinFiles = async (projectId, filesArr) => {
  const crowdinFiles = await getFiles(projectId);

  for (let { change, origFilename, newFilename, fileContent } of filesArr) {
    if (change === 'A') change = 'M';

    if (change === 'D' || change === 'M') {
      const fileInfoFound = getFileInfo(crowdinFiles, origFilename);
      if (change === 'D') {
        await deleteFile(projectId, fileInfoFound.fileId);
        // TO-DO: Figure how to dynamically generate PR
        // to delete the file from all the non-English directories
        // A better solution would be to create an array of all files
        // needing deletion and delete all of them after the for loop
        // and create a single PR for all files needing deletion
      }
      const tempFile = `temp-files/${origFilename}`;
      fse.outputFileSync(tempFile, fileContent);
      const annotatedContent = await annotate(tempFile);
      if (fileInfoFound) {
        await updateExistingFile(
          projectId,
          fileInfoFound.fileId,
          annotatedContent
        );
      } else {
        await addNewFile(projectId, origFilename, annotatedContent);
      }
    } else if (change === 'R' || change === 'C') {
      await deleteFile(projectId, origFilename);
      const tempFile = `temp-data/${newFilename}`;
      fse.outputFileSync(tempFile, fileContent);
      const annotatedContent = await annotate(tempFile);
      const fileInfoFound = getFileInfo(crowdinFiles, newFilename);
      if (fileInfoFound) {
        await updateExistingFile(
          projectId,
          fileInfoFound.fileId,
          annotatedContent
        );
      } else {
        await addNewFile(projectId, origFilename, annotatedContent);
      }
    }
  }
};

const getFileInfo = (crowdinFiles, filepath) =>
  crowdinFiles.find(crowdinFile => filepath === crowdinFile.path);

const projectId = 10;

const filesToUpdate = require('./fixtures/filesToUpdate');

updateCrowdinFiles(projectId, filesToUpdate);
