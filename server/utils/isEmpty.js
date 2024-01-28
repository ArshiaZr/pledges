module.exports = isEmpty = (input) => {
  return (
    input === undefined ||
    input === null ||
    (typeof input === "object" && Object.keys(input).length === 0) ||
    (typeof input === "string" && input.trim().length === 0)
  );
};
