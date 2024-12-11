import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-champs',
  standalone: true,
  imports: [],
  templateUrl: './champs.component.html',
  styleUrl: './champs.component.css'
})
export class ChampsComponent {
  @Input()
  message !: string;

  @Input()
  input_id !: string;

  @Input()
  hide : string = "false";
}
