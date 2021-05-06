import { Component } from '@angular/core';
import {CalculationService} from './calculation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Calculator';
  result: number = null;
  number1: any[] = [];
  number2: any[] = [];
  number1Set = false;
  displayNumber1: string;
  displayNumber2: string;
  symbol: string;
  negativeSymbol = false;
  hasDecimal = false;

  clear() {
    this.displayNumber1 = '';
    this.displayNumber2 = '';
    this.number1.length = 0;
    this.number2.length = 0;
    this.result = null;
    this.number1Set = false;
    this.hasDecimal = false;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  changeDisplayNumber() {
    this.displayNumber1 = this.number1.join('');
    console.log(this.displayNumber1);
    console.log(this.displayNumber2);
    this.displayNumber2 = this.number2.join('');
  }

  constructor(private calculationService: CalculationService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {

  }

  addition() {
    this.calculationService.getAddtion(+this.number1.join(''), +this.number2.join('')).subscribe(p => {
      this.result = p
      this.makeResultNumberOne();
    });
  }
  subtraction() {
    this.calculationService.getSubtraction(+this.number1.join(''), +this.number2.join('')).subscribe(p => {
      this.result = p
      this.makeResultNumberOne();
    });
  }
  division() {
    this.calculationService.getDivision(+this.number1.join(''), +this.number2.join('')).subscribe(p => {
      this.result = p
      this.makeResultNumberOne();
    });
  }
  multiplication() {
    this.calculationService.getMultiplication(+this.number1.join(''), +this.number2.join('')).subscribe(p => {
      this.result = p
      this.makeResultNumberOne();
    });
  }
  percentage() {
    this.calculationService.getPercentage(+this.number1.join('')).subscribe(p => {
      this.result = p
      this.makeResultNumberOne();
    });
  }

  makeResultNumberOne() {
    this.number1 = this.result.toString().split('');
    this.number2.length = 0;
    if(this.result < 0) {
      console.log("result is less than 0");
      this.negativeSymbol = true;
    }
    this.number1Set = false;
    this.result = null;
    this.changeDisplayNumber();
  }

  negative() {
    if (!this.negativeSymbol ) {
      !this.number1Set ? this.number1.unshift('-') : this.number2.unshift('-');
      this.changeDisplayNumber();
      this.negativeSymbol = true;
    } else if (this.negativeSymbol) {
      !this.number1Set ? this.number1.shift() : this.number2.shift();
      console.log(this.number1Set);
      console.log(this.number1);
      this.changeDisplayNumber();
      this.negativeSymbol = false;
    }
  }

  swapNumber(symbol) {
    console.log(this.number1Set)
    if (!this.number1Set){
      this.number1Set = true;
    }

    this.symbol = symbol;
    this.negativeSymbol = false;
    this.hasDecimal = false;

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

}
