import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private http: HttpClient) { }

  getAddtion(number1: number, number2: number) {
    return this.http.get<number>('http://localhost:61377/addition/' + number1 + '/' + number2 + '/');
  }

  getSubtraction(number1: number, number2: number) {
    return this.http.get<number>('http://localhost:61377/subtraction/' + number1 + '/' + number2 + '/');
  }

  getDivision(number1: number, number2: number) {
    return this.http.get<number>('http://localhost:61377/division/' + number1 + '/' + number2 + '/');
  }

  getMultiplication(number1: number, number2: number) {
    return this.http.get<number>('http://localhost:61377/multiplication/' + number1 + '/' + number2 + '/');
  }

  getPercentage(number1: number) {
    return this.http.get<number>('http://localhost:61377/percentage/' + number1 + '/');
  }
}
