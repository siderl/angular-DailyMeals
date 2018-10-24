import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MealsService } from '../../services/meals/meals.service';
import { Diet } from '../../models/diet.model';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.css']
})
export class DietaComponent {

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
  private showInTable: boolean;

  constructor(
    private mealsService: MealsService
  ) { }

  calculate(forma: NgForm) {
    console.log("testSubmit")
    console.log(forma)
    let peso = forma.controls["peso"].value
    let estatura = forma.controls["estatura"].value
    let edad = forma.controls["edad"].value
    let sexo = forma.controls["sexo"].value
    let activity = forma.controls["activity"].value
    let goal = forma.controls["goal"].value
    //console.log("sexo:", forma.controls["sexo"])
    if (sexo == 'value1') {
      this.calories = 66.4730 + ((13.751 * peso) + (5.0033 * estatura) - (6.75 * edad))
    }
    else if (sexo == 'value2') {
      this.calories = 655.1 + ((9.463 * peso) + (1.8 * estatura) - (4.6756 * edad))
    }

    switch (activity) {
      case "Sedentario":
        this.calories = this.calories * 1.2;
        break;
      case "Actividad ligera":
        this.calories = this.calories * 1.375;
        break;
      case "Actividad moderada":
        this.calories = this.calories * 1.55;
        break;
      case "Actividad intensa":
        this.calories = this.calories * 1.725;
        break;
      case "Actividad muy intensa":
        this.calories = this.calories * 1.9;
        break;
    }

    if (goal == 'Adelgazar') {
      this.calories = this.calories * .85;
    }
    else if (goal == 'Subir de peso') {
      this.calories = this.calories * 1.15;
    }

    this.loading = true;

    console.log(this.calories);
    this.mealsService.getMeals(this.calories).subscribe(
      (successResponse) => {
        console.log(successResponse);
        this.diet = successResponse.json();
        this.showTable = true;
        this.loading = false;
        this.breakfast.push(this.diet.dieta[0]);
        this.breakfast.push(this.diet.dieta[1]);
        this.collation1.push(this.diet.dieta[2]);
        this.strongMeal.push(this.diet.dieta[3]);
        this.strongMeal.push(this.diet.dieta[4]);
        this.strongMeal.push(this.diet.dieta[5]);
        this.strongMeal.push(this.diet.dieta[6]);
        this.collation2.push(this.diet.dieta[7]);
        this.dinner.push(this.diet.dieta[8]);
        this.dinner.push(this.diet.dieta[9]);
        console.log(this.breakfast);
        //this.createPDFDiet();
        console.log(this.diet)
      }, (errorResponse) => {
        console.log("Error");
        console.log(errorResponse);

      });
  }

  private createPDFDiet() {

    const dietData = this.tableDietData();
    //const dietData;
    const docDefinitionDiet = {
      pageSize: 'A4',
      extend: 'pdfHtml5',
      pageOrientation: 'portrait',
      pageMargins: [30,80,30,40],

      header: {
        columns: [
          {
            text: 'DailyMeals: Dieta',
            alignment: 'center',
            margin: 30,
            style: 'fontSizeText'
          }
      ]},
      content: [
        {
          table: dietData
        }
      ],
      styles: {
        fontSizeText: {
          fontSize: 12
        }
      }
    }

    console.log(pdfMake);
    //pdfMake.createPDF(docDefinitionDiet).download('Dieta.pdf');
    pdfMake.createPdf(docDefinitionDiet).download('Dieta.pdf');
  }

  private tableDietData(){
    const rows = [];
    const breakfast = this.breakfast;
    const collac1 = this.collation1;
    const strongM = this.strongMeal;
    const collac2 = this.collation2;
    const dinner = this.dinner;

    const breakfastCount = breakfast.length;
    const collac1Count = collac1.length;
    const strongMCount = strongM.length;
    const collac2Count = collac2.length;
    const dinnerCount = dinner.length;

    /*const rowBreakfastTitle = [
      { text: 'Desayuno: ', style: 'fontSizeText', border: [false, true, false, true] }
    ];

    rows.push(rowBreakfastTitle);*/

    const rowBreakfastHeaders = [
      { text: 'Alimento ', style: 'fontSizeText', border: [false, true, false, true] },
      { text: 'Porcion', style: 'fontSizeText', border: [false, true, false, true] },
      { text: 'Cantidad', style: 'fontSizeText', border: [false, true, false, true] },
      { text: 'Unidad', style: 'fontSizeText', border: [false, true, false, true] }
    ];

    rows.push(rowBreakfastHeaders);

    const rowBreakfastLbl = [
      { text: 'Desayuno ', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] }
    ];

    rows.push(rowBreakfastLbl);

    for (let n = 0; n < breakfastCount; n++){
      const row = new Array();
      row.push(
        { text: breakfast[n].AlimentoName, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: breakfast[n].multiplier, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: breakfast[n].CantidadSugerida, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: breakfast[n].Unidad, style: 'fontSizeText', border: [false, true, false, true]  },
      )

      rows.push(row);
    }

    const rowCollac1Lbl = [
      { text: 'Colación ', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] }
    ];

    rows.push(rowCollac1Lbl);

    for (let n = 0; n < collac1Count; n++){
      const row = new Array();
      row.push(
        { text: collac1[n].AlimentoName, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: collac1[n].multiplier, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: collac1[n].CantidadSugerida, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: collac1[n].Unidad, style: 'fontSizeText', border: [false, true, false, true]  },
      )

      rows.push(row);
    }

    const rowStrongMLbl = [
      { text: 'Comida ', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] }
    ];

    rows.push(rowStrongMLbl);

    for (let n = 0; n < strongMCount; n++){
      const row = new Array();
      row.push(
        { text: strongM[n].AlimentoName, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: strongM[n].multiplier, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: strongM[n].CantidadSugerida, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: strongM[n].Unidad, style: 'fontSizeText', border: [false, true, false, true]  },
      )

      rows.push(row);
    }

    const rowCollac2Lbl = [
      { text: 'Colación ', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] }
    ];

    rows.push(rowCollac2Lbl);

    for (let n = 0; n < collac2Count; n++){
      const row = new Array();
      row.push(
        { text: collac2[n].AlimentoName, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: collac2[n].multiplier, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: collac2[n].CantidadSugerida, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: collac2[n].Unidad, style: 'fontSizeText', border: [false, true, false, true]  },
      )

      rows.push(row);
    }

    const rowDinnerLbl = [
      { text: 'Cena ', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] },
      { text: '', style: 'fontSizeText', border: [false, true, false, true] }
    ];

    rows.push(rowDinnerLbl);

    for (let n = 0; n < dinnerCount; n++){
      const row = new Array();
      row.push(
        { text: dinner[n].AlimentoName, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: dinner[n].multiplier, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: dinner[n].CantidadSugerida, style: 'fontSizeText', border: [false, true, false, true]  },
        { text: dinner[n].Unidad, style: 'fontSizeText', border: [false, true, false, true]  },
      )

      rows.push(row);
    }

    return {
      headerRows: 1,
      widths: [117, 80, 117, 80],
      body: rows
    };
  }

  private changeDietShowingForm()
  {
    this.showInTable = !this.showInTable;
  }

  private printDietPDF()
  {
    this.createPDFDiet();
  }

}
