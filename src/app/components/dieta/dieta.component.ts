import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MealsService } from '../../services/meals/meals.service';
import { Diet } from '../../models/diet.model';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.css']
})
export class DietaComponent{

  public calories;
  private porcionLeche;
  private caloriasLeche;
  private porcionPollo;
  private caloriasPollo;
  private porcionBistec;
  private caloriasBistec;
  private porcionAvena;
  private caloriasAvena;
  private porcionPescado;
  private caloriasPescado;
  private porcionHuevo;
  private caloriasHuevo;
  private totalCaloriasDieta;
  private diet: Diet = new Diet();
  private showTable: boolean;
  private loading: boolean;
  private breakfast: any = [];
  private collation1: any = [];
  private collation2: any = [];
  private strongMeal: any = [];
  private dinner: any = [];

  constructor(
    private mealsService : MealsService
  ) { }

  calculate(forma:NgForm){
    console.log("testSubmit")
    console.log(forma)
    let peso = forma.controls["peso"].value
    let estatura = forma.controls["estatura"].value
    let edad = forma.controls["edad"].value
    let sexo = forma.controls["sexo"].value
    //console.log("sexo:", forma.controls["sexo"])
    if(sexo == 'value1')
    {
      this.calories =  66.4730 + ((13.751 * peso) + (5.0033 * estatura) - (6.75 * edad))
    }
    else if(sexo == 'value2')
    {
      this.calories = 655.1 + ((9.463 * peso) + (1.8 * estatura) - (4.6756 * edad))
    }

    this.loading = true;

    console.log(this.calories);
    this.mealsService.getMeals(this.calories).subscribe(
      (successResponse) => {
        console.log(successResponse);
        this.diet = successResponse.json();
        this.showTable = true;
        this.loading = false;
        console.log(this.diet)
      }, (errorResponse) => {
        console.log("Error");
        console.log(errorResponse);
        
      });
  }

}
