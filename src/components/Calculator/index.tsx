import { useState } from "react";

import Button from "../Button";
import Display from "../Display";

import "./Calculator.css";

export const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<any>("0");
  const [clearDisplay, setClearDisplay] = useState<boolean>(false);
  const [operation, setOperation] = useState<any>("");
  const [values, setValues] = useState<number[]>([0, 0]);
  const [current, setCurrent] = useState<number>(0);
  function clearMemory() {
    setDisplayValue("0");
    setClearDisplay(false);
    setOperation("");
    setValues([0, 0]);
    setCurrent(0);
  }
  function handleOperation(operation: string) {
    if (current === 0) {
      setOperation(operation);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = operation === "=";
      const currentOperation = operation;

      const newValues = [...values];
      newValues[0] = eval(`${newValues[0]}${currentOperation}${newValues[1]}`);
      newValues[1] = 0;
      setDisplayValue(String(newValues[0]));
      setOperation(equals ? null : operation);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(newValues);
    }
  }

  function addDigit(n: string) {
    if (n === "." && displayValue.includes(".")) return;
    const clearDisplayValue = displayValue === "0" || clearDisplay;
    const currentValue = clearDisplayValue ? "" : displayValue;
    const displayValueCalc = currentValue + n;
    setDisplayValue(displayValueCalc);
    setClearDisplay(false);

    if (n !== ".") {
      const i = current;
      const newValueNumber = parseFloat(displayValueCalc);
      const newValues = [...values];
      newValues[i] = newValueNumber;
      setValues(newValues);
      console.log(newValues);
    }
  }

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <Button label="AC" click={clearMemory} triple />
      <Button label="/" click={handleOperation} operation />
      <Button label="7" click={addDigit} />
      <Button label="8" click={addDigit} />
      <Button label="9" click={addDigit} />
      <Button label="*" click={handleOperation} operation />
      <Button label="4" click={addDigit} />
      <Button label="5" click={addDigit} />
      <Button label="6" click={addDigit} />
      <Button label="-" click={handleOperation} operation />
      <Button label="1" click={addDigit} />
      <Button label="2" click={addDigit} />
      <Button label="3" click={addDigit} />
      <Button label="+" click={handleOperation} operation />
      <Button label="0" click={addDigit} double />
      <Button label="." click={addDigit} />
      <Button label="=" click={() => handleOperation(operation)} operation />
    </div>
  );
};
