import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.css']
})
export class DietaComponent{

  private calories
  private porcionLeche
  private caloriasLeche
  private porcionPollo
  private caloriasPollo
  private porcionBistec
  private caloriasBistec
  private porcionAvena
  private caloriasAvena
  private porcionPescado
  private caloriasPescado
  private porcionHuevo
  private caloriasHuevo
  private totalCaloriasDieta

  constructor() { }

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

    document.getElementById('alimentos').style.visibility = 'visible'
    document.getElementById('totalCalories').style.visibility = 'visible'
    document.getElementById('lblTotalCal').style.visibility = 'visible'
  }

  updateTotalCalories(){
    console.log("star wars")
    this.totalCaloriasDieta = 0
    if(this.caloriasLeche > 0)
    {
      this.totalCaloriasDieta += this.caloriasLeche
    }
    if(this.caloriasPollo > 0)
    {
      this.totalCaloriasDieta += this.caloriasPollo
    }
    if(this.caloriasBistec > 0)
    {
      this.totalCaloriasDieta += this.caloriasBistec
    }
    if(this.caloriasAvena > 0)
    {
      this.totalCaloriasDieta += this.caloriasAvena
    }
    if(this.caloriasPescado >0)
    {
      this.totalCaloriasDieta += this.caloriasPescado
    }
    if(this.caloriasHuevo > 0)
    {
      this.totalCaloriasDieta += this.caloriasHuevo
    }

    if(this.totalCaloriasDieta > this.calories)
    {
      document.getElementById('totalCalories').style.color = "red"
    }

  }


  onInputLeche(value){
    this.caloriasLeche = value * 149
    this.updateTotalCalories()
  }

  onInputPollo(value){
    this.caloriasPollo = value * 394
    this.updateTotalCalories()
  }

  onInputBistec(value){
    this.caloriasBistec = value * 504
    this.updateTotalCalories()
  }

  onInputAvena(value){
    this.caloriasAvena = value * 389
    this.updateTotalCalories()
  }

  onInputPescado(value){
    this.caloriasPescado = value * 168
    this.updateTotalCalories()
  }

  onInputHuevo(value){
    this.caloriasHuevo = value * 74
    this.updateTotalCalories()
  }

}
