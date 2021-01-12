import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = "http://localhost:8182/api/countries";
  private statesUrl = "http://localhost:8182/api/states";


  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {   // observable return is needed, because angular components will subscribe for this

    let data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at current month and loop until 12

    for (let theMonth = startMonth; theMonth <= 12; theMonth ++) {
      data.push(theMonth);
    }

    return of(data);      // of method is needed to return an observable (it wraps the object)
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Year" dropdown list
    // - start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear ++) {
      data.push(theYear);
    }

    return of(data);      // of method is needed to return an observable (it wraps the object)
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}
