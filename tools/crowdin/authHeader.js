require('dotenv').config();

const authHeader = {
  Authorization: `Bearer ${process.env.CROWDIN_ACCESS_TOKEN}`
};

module.exports = authHeader;
