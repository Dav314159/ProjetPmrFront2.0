import {Component, inject, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [],
  templateUrl: './carte.component.html',
  styleUrl: './carte.component.css'
})
export class CarteComponent implements OnInit {
  renderer = inject(Renderer2);
  ngOnInit() {
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    this.renderer.setAttribute(link, 'href', "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
    this.renderer.setAttribute(link, 'integrity', "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=");
    this.renderer.setAttribute(link, 'crossOrigin', "");
  }
}
