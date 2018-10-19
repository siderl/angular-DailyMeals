import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class MealsService {

  //private generateDietURL = 'http://18.225.18.62:8080/DailyMeals/ServiceDailyMeals.svc/GetData/'; //Production
  private generateDietURL = 'http://localhost:2670/ServiceDailyMeals.svc/GetData/'; //Testing
  constructor(private http: Http) { }

  public getMeals(kCalories){
    const headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');

    return this.http.get(
      this.generateDietURL + kCalories,
      {headers: headers});
  }
}
