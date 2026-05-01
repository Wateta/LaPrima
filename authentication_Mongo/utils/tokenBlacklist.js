const blacklist = new Set();

const add = (token) => {
  blacklist.add(token);
};

const has = (token) => {
  return blacklist.has(token);
};

module.exports = {
  add,
  has,
};
