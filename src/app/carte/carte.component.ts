import {Component, inject, OnInit, Renderer2} from '@angular/core';
import * as L from 'leaflet';

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
    // Ajout d'un link vers le CSS de la carte interactive
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    this.renderer.setAttribute(link, 'href', "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
    this.renderer.setAttribute(link, 'integrity', "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=");
    this.renderer.setAttribute(link, 'crossOrigin', "");

    this.renderer.appendChild(document.head, link);

    // Ajout d'une balise script pour ajouter le code gérant la carte interactive
    const script = this.renderer.createElement('script');
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";

    this.renderer.appendChild(document.head, script);

    var map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }
}
