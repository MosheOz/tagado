function groupTerms(types) {
  console.log(types);
  let tempObj = {};
  types[0].values.forEach((type) => {
    if (!type.name) return;
    let { name } = type;
    if (tempObj[name]) {
      tempObj[name]++;
    } else {
      tempObj[name] = 1;
    }
  });

  return tempObj;
}

module.exports = { groupTerms };
