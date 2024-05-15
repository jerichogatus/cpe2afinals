import React, { useState } from 'react';
import './App.css';

function CalcButton({ label, buttonClassName = "CalcButton", onClick }) {
  return (
    <button className={`${buttonClassName} ${label === 'CLR' || label === 'NEG' ? 'special' : ''} ${['ADD', 'SUB', 'MUL', 'DIV', 'EXP', 'MOD', 'EQ'].includes(label) ? 'operator' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
}

function CalcDisplay({ display }) {
  return (
    <div className="CalcDisplay">
      {display}
    </div>
  );
}

export default function App() {
  const [disp, setDisp] = useState('0');
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [op, setOp] = useState(null);

  const clrClickHandler = () => {
    setDisp('0');
    setNum1(null);
    setNum2(null);
    setOp(null);
  }

  const equalClickHandler = () => {
    if (num1 !== null && num2 !== null && op !== null) {
      let result = null;
      switch (op) {
        case "ADD":
          result = parseFloat(num1) + parseFloat(num2);
          break;
        case "SUB":
          result = parseFloat(num1) - parseFloat(num2);
          break;
        case "MUL":
          result = parseFloat(num1) * parseFloat(num2);
          break;
        case "DIV":
          result = parseFloat(num1) / parseFloat(num2);
          break;
        case "EXP":
          result = Math.pow(parseFloat(num1), parseFloat(num2));
          break;
        case "MOD":
          result = parseFloat(num1) % parseFloat(num2);
          break;
        default:
          result = 'Invalid Operation';
      }
      setDisp(result.toString());
      setNum1(result.toString());
      setNum2(null);
      setOp(null);
    }
  }

  const numberClickHandler = (e) => {
    const value = e.target.innerHTML;
    if (disp === '0' && value === '0') {
      return;
    }
    if (op === null) {
      if (num1 === null) {
        setNum1(value);
        setDisp(value);
      } else {
        setNum1(num1 + value);
        setDisp(num1 + value);
      }
    } else {
      if (num2 === null) {
        setNum2(value);
        setDisp(value);
      } else {
        setNum2(num2 + value);
        setDisp(num2 + value);
      }
    }
  }

  const opClickHandler = (e) => {
    const value = e.target.innerHTML;
    setOp(value);
    setDisp(value);
  }

  const decimalClickHandler = () => {
    if (op === null) {
      if (num1 === null) {
        setNum1('0.');
        setDisp('0.');
      } else if (!num1.includes('.')) {
        setNum1(num1 + '.');
        setDisp(num1 + '.');
      }
    } else {
      if (num2 === null) {
        setNum2('0.');
        setDisp('0.');
      } else if (!num2.includes('.')) {
        setNum2(num2 + '.');
        setDisp(num2 + '.');
      }
    }
  }

  const negClickHandler = () => {
    if (op === null) {
      if (num1 !== null) {
        setNum1((parseFloat(num1) * -1).toString());
        setDisp((parseFloat(num1) * -1).toString());
      }
    } else {
      if (num2 !== null) {
        setNum2((parseFloat(num2) * -1).toString());
        setDisp((parseFloat(num2) * -1).toString());
      }
    }
  }

  return (
    <div className="App">
      <h1>JERICHO CANLAS GATUS - CPE 2A</h1>
      <div className="CalcContainer">
        <CalcDisplay display={disp} />
        <div className="ButtonContainer">
          <CalcButton label={7} onClick={numberClickHandler} />
          <CalcButton label={8} onClick={numberClickHandler} />
          <CalcButton label={9} onClick={numberClickHandler} />
          <CalcButton label={"DIV"} onClick={opClickHandler} />
          <CalcButton label={4} onClick={numberClickHandler} />
          <CalcButton label={5} onClick={numberClickHandler} />
          <CalcButton label={6} onClick={numberClickHandler} />
          <CalcButton label={"MUL"} onClick={opClickHandler} />
          <CalcButton label={1} onClick={numberClickHandler} />
          <CalcButton label={2} onClick={numberClickHandler} />
          <CalcButton label={3} onClick={numberClickHandler} />
          <CalcButton label={"SUB"} onClick={opClickHandler} />
          <CalcButton label={"CLR"} onClick={clrClickHandler} />
          <CalcButton label={0} onClick={numberClickHandler} />
          <CalcButton label={"."} onClick={decimalClickHandler} />
          <CalcButton label={"ADD"} onClick={opClickHandler} />
          <CalcButton label={"EXP"} onClick={opClickHandler} />
          <CalcButton label={"MOD"} onClick={opClickHandler} />
          <CalcButton label={"NEG"} onClick={negClickHandler} />
          <CalcButton label={"EQ"} onClick={equalClickHandler} />
        </div>
      </div>
    </div>
  );
}
