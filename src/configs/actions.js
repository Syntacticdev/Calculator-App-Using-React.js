const calculate = () => {
  if (prev !== undefined || prev !== "")
    if (initialValue.trim().length !== 0)
      switch (action) {
        case "/":
          assignResult(parseFloat(prev / initialValue));
          break;
        case "+":
          assignResult(parseFloat(prev) + parseFloat(initialValue));
          break;
        case "-":
          assignResult(parseFloat(prev - initialValue));
          break;
        case "*":
          assignResult(parseFloat(prev * initialValue));
          break;
        case "√":
          assignResult(parseFloat(prev * initialValue));
          break;
        default:
          return;
      }
};

const initAction = (fk) => {
  if (fk === "=") {
    return calculate();
  }
  if (fk === "DEL") {
    setInitialValue((prevState) => prevState.toString().slice(0, -1));
    return;
  }
  if (fk === "AC") {
    setPrev("");
    setInitialValue(0);
    setResult("");
    setAction("");
    return;
  }
  if (result) {
    setPrev(result);
    setAction(fk);
    setResult("");
    setInitialValue("");
  }
  if (initialValue === undefined || initialValue === "") return;

  setAction(fk);
  setPrev(initialValue);
  setInitialValue("");
};

const assignInitial = (prev, num) => {
  return prev !== 0 ? `${prev}${num}` : prev + num;
};

const checkExistingChar = (char, prev) => {
  if (initialValue.includes(char)) return prev;
  return prev.concat(char);
};

export { calculate, initAction, assignInitial, checkExistingChar };
