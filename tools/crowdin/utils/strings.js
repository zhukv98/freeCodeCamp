const authHeader = require('../authHeader');
const makeRequest = require('./make-request');
const delay = require('./delay');

const shouldHide = (text, context, challengeTitle) => {
  // assuming notranslate is true if context has the XPath type of notranslate
  if (context.includes('/notranslate')) return true;
  if (text !== challengeTitle && context.includes('id=front-matter'))
    return true;
  return false;
};

const getStrings = async ({ projectId, fileId }) => {
  let headers = { ...authHeader };
  const endPoint = `projects/${projectId}/strings?fileId=${fileId}&limit=500`;
  const strings = await makeRequest({ method: 'get', endPoint, headers });
  if (strings.data) {
    return strings.data;
  } else {
    const { error, errors } = strings;
    console.error(error ? error : errors);
    return null;
  }
};

const updateString = async ({ projectId, stringId, propsToUpdate }) => {
  let headers = { ...authHeader };
  const endPoint = `projects/${projectId}/strings/${stringId}`;
  const body = propsToUpdate.map(({ path, value }) => ({
    op: 'replace',
    path,
    value
  }));
  await makeRequest({
    method: 'patch',
    endPoint,
    headers,
    body
  });
};

const hideString = async (projectId, stringId) => {
  await updateString({
    projectId,
    stringId,
    propsToUpdate: [{ path: '/isHidden', value: true }]
  });
  await delay(200);
};

const updateFileStrings = async ({ projectId, fileId, challengeTitle }) => {
  const fileStrings = await getStrings({
    projectId,
    fileId
  });

  for (let {
    data: { id: stringId, text, isHidden, context }
  } of fileStrings) {
    if (!isHidden && shouldHide(text, context, challengeTitle)) {
      await hideString(projectId, stringId);
    }
  }
};

module.exports = {
  getStrings,
  hideString,
  updateString,
  updateFileStrings
};
