import { Component } from '@angular/core';
import {CalculationService} from './calculation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Calculator';
  result: number;
  number1: any[] = [];
  number2: any[] = [];
  number1Set = false;
  displayNumber1: string;
  displayNumber2: string;
  symbol: string;
  negativeSymbol = false;
  hasDecimal = false;

  // tslint:disable-next-line:use-life-cycle-interface
  changeDisplayNumber() {
    this.displayNumber1 = this.number1.join('');
    this.displayNumber2 = this.number2.join('');
  }

  constructor(private calculationService: CalculationService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {

  }

  addition() {
    this.calculationService.getAddtion(+this.number1.join(''), +this.number2.join('')).subscribe(p => this.result = p);
    
  }
  subtraction() {
    this.calculationService.getSubtraction(+this.number1.join(''), +this.number2.join('')).subscribe(p => this.result = p);
  }
  division() {
    this.calculationService.getDivision(+this.number1.join(''), +this.number2.join('')).subscribe(p => this.result = p);
  }
  multiplication() {
    this.calculationService.getMultiplication(+this.number1.join(''), +this.number2.join('')).subscribe(p => this.result = p);
  }
  percentage() {
    this.calculationService.getPercentage(+this.number1.join('')).subscribe(p => this.result = p);
  }

  negative() {
    if (!this.negativeSymbol ) {
      !this.number1Set ? this.number1.unshift('-') : this.number2.unshift('-');
      this.changeDisplayNumber();
      this.negativeSymbol = true;
    } else if (this.negativeSymbol) {
      !this.number1Set ? this.number1.shift() : this.number2.shift();
      this.changeDisplayNumber();
      this.negativeSymbol = false;
    }
  }

  swapNumber(symbol) {
    if (this.result !== undefined) {
      this.number1 = [this.result];
    }
    !this.number1Set ?  this.number1Set = true : this.number1Set = false;
    if (this.result !== undefined) {
      this.number1 = [this.result];
    }
    this.symbol = symbol;
    this.negativeSymbol = false;
    this.hasDecimal = false;

  }
  percentageLocal(symbol) {
    this.swapNumber(symbol);
    this.setNumber(this.calculate());
    this.number1Set = true;

  }

  decimal() {
    if (!this.hasDecimal) {
      !this.number1Set ? this.number1.push('.') : this.number2.push('.');
      this.hasDecimal = true;
      this.changeDisplayNumber();
    }
  }

  setNumber(number) {
    if (!this.number1Set) {
      this.number1.push(number);
      this.changeDisplayNumber();
    } else {
      this.number2.push(number);
      this.changeDisplayNumber();
    }
  }

  calculate() {
    switch (this.symbol) {
      case '+':
        this.addition();
        break;
        case '-':
        this.subtraction();
        break;
        case '/':
        this.division();
        break;
        case '*':
        this.multiplication();
        break;
        case '%':
        this.percentage();
        break;
    }
  }

  clear() {
    this.displayNumber1 = '';
    this.displayNumber2 = '';
    this.number1 = [];
    this.number2 = [];
    this.result = null;
    this.number1Set = false;
    this.hasDecimal = false;
  }

}
