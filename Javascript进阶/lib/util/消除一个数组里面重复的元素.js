myArray.filter((elem, pos, self) => {
  return self.indexOf(elem) === pos;
});