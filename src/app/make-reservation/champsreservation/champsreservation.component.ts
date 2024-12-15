import { Component, Input } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-champs',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './champsreservation.component.html',
  styleUrl: './champsreservation.component.css'
})
export class ChampsreservationComponent {
  @Input()
  message !: string;

  @Input()
  input_id !: string;

  @Input()
  regex : string = "^(.*?)$";

  @Input()
  erreurMessage : string = "Le format de l'input n'est pas respecté";

  @Input()
  hide : string = "false";

  correct : boolean = true;

  checkRegex(e: Event): boolean{
    let contenu : string = (<HTMLInputElement>e.target).value;

    this.correct = RegExp(this.regex).test(contenu);
    if (contenu === ""){
      this.correct = true;
    }

    /*if (!this.correct){
      console.log("faux");
    }
    else{
      console.log("correct");
    }*/

    return this.correct;
  }
}
