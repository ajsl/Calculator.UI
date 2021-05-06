import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  apiUrl = 'https://localhost:5001/api/calculator/';

  constructor(private http: HttpClient) {}

  getAddtion(number1: number, number2: number) {

    return this.http.get<number>(
      this.apiUrl + 'add/' + number1 + '/' + number2,
    );
  }

  getSubtraction(number1: number, number2: number) {
    return this.http.get<number>(
      this.apiUrl + 'sub/' + number1 + '/' + number2
    );
  }

  getDivision(number1: number, number2: number) {
    return this.http.get<number>(
      this.apiUrl + 'div/' + number1 + '/' + number2
    );
  }

  getMultiplication(number1: number, number2: number) {
    return this.http.get<number>(
      this.apiUrl + 'multiply/' + number1 + '/' + number2
    );
  }

  getPercentage(number1: number) {
    return this.http.get<number>(this.apiUrl + 'percent/' + number1);
  }
}
