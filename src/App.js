import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [initialValue, setInitialValue] = useState(0);
  const [prev, setPrev] = useState("");
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const funcs = ["*", "+", "–", "÷", "√", "log", "!", "DEL", "AC", "="];
  const chars = ["."];

  useEffect(() => {
    if (action === "√") {
      const sqrt = Math.sqrt(prev);
      setResult(sqrt);
    }

    if (action === "!" && prev !== 0) {
      const facNums = [];
      for (let i = 1; i <= prev; i++) {
        facNums.push(i);
      }
      setResult(facNums.map((e) => e).reduce((a, b) => a * b));
    }
    if (action === "log") {
      const log = Math.log10(prev);
      setResult(log);
    }
  }, [action, result, prev]);

  const assignResult = (rst) => {
    setResult(rst);
    setAction("");
    setInitialValue("");
    setPrev("");
  };

  const calculate = () => {
    switch (action) {
      case "÷":
        assignResult(parseFloat(prev / initialValue));
        break;
      case "+":
        assignResult(parseFloat(prev) + parseFloat(initialValue));
        break;
      case "–":
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

    if (fk === "–" && initialValue === 0 && initialValue !== "–") {
      return setInitialValue("-");
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

  const displayDigit = digits.map((num, i) => (
    <button
      className=" nums "
      key={i}
      onClick={(e) => setInitialValue((prev) => assignInitial(prev, num))}
    >
      {num}
    </button>
  ));
  const checkExistingChar = (char) => {
    if (initialValue === "") return;
    if (initialValue.toString().includes(char)) return prev;
    setInitialValue((prevState) => prevState + char);
  };

  const displayChar = chars.map((char, i) => (
    <button
      className=" text-white "
      key={i}
      onClick={(e) => checkExistingChar(char)}
    >
      {char}
    </button>
  ));
  const displayFunc = funcs.map((fk, i) => (
    <button key={i} onClick={() => initAction(fk)}>
      {fk === "*" ? "x" : fk}
    </button>
  ));

  return (
    <div className="App">
      <div className="calculator_wrapper">
        <div className="cal_head">
          <div className="screen">
            <div>
              <span className="calc_title">Syntactic</span>
            </div>
            <div className="prev">
              {action === "√" || action === "log" ? action : ""}
              {prev} {action === "√" || action === "log" ? "" : action}
            </div>
            <div className="result">
              {" "}
              {result ? result : initialValue ?? "0"}{" "}
            </div>
          </div>
        </div>
        <div className="cal_body">
          <div className="digit">
            {displayDigit}
            {displayChar}
            {displayFunc}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
