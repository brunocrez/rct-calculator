import './styles.css';

import { Component } from 'react';
import Button from './Button';
import Display from './Display';

const initialState = {
  displayValue: '0',
  operation: null,
  clearDisplay: false,
  values: [0, 0],
  index: 0
}
export default class Calculator extends Component {

  state = { ...initialState };

  constructor(props) {
    super(props);
    this.setDigit = this.setDigit.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.clearEverything = this.clearEverything.bind(this);
  }

  setDigit(n) {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return;
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;

    this.setState({ displayValue, clearDisplay: false });

    if (n !== '.') {
      const value = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.index] = value;
      this.setState({ values });
    }
  }

  setOperation(operation) {

    if (this.state.index == 0) {
      this.setState({ clearDisplay: true, index: 1, operation });
    } else {
      const values = [...this.state.values];
      const currentOp = this.state.operation;
      const equals = operation === '=';

      switch (currentOp) {
        case '/':
          values[0] = parseFloat(values[0]) / parseFloat(values[1]);
          values[1] = 0;
          break;
        case '*':
          values[0] = parseFloat(values[0]) * parseFloat(values[1]);
          values[1] = 0;
          break;
        case '+':
          values[0] = parseFloat(values[0]) + parseFloat(values[1]);
          values[1] = 0;
          break;
        default:
          values[0] = parseFloat(values[0]) - parseFloat(values[1]);
          values[1] = 0;
          break;
      }
      
      this.setState({ 
        displayValue: values[0], 
        operation: equals ? null : operation,
        clearDisplay: !equals, 
        index: equals ? 0 : 1, 
        values 
      });
    }
  }

  clearEverything() {
    this.setState({ ...initialState });
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue}/>
        <Button click={this.clearEverything} label="CE" triple />
        <Button click={this.setOperation} label="/" operation />
        <Button click={this.setDigit} label="7"/>
        <Button click={this.setDigit} label="8"/>
        <Button click={this.setDigit} label="9"/>
        <Button click={this.setOperation} label="*" operation />
        <Button click={this.setDigit} label="4"/>
        <Button click={this.setDigit} label="5"/>
        <Button click={this.setDigit} label="6"/>
        <Button click={this.setOperation} label="-" operation />
        <Button click={this.setDigit} label="1"/>
        <Button click={this.setDigit} label="2"/>
        <Button click={this.setDigit} label="3"/>
        <Button click={this.setOperation} label="+" operation />
        <Button click={this.setDigit} label="0" double />
        <Button click={this.setDigit} label="."/>
        <Button click={this.setOperation} label="=" operation />
      </div>
    );
  }
}