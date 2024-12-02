import {AfterViewInit, Component, inject, OnInit, Renderer2} from '@angular/core';
import * as L from 'leaflet';
import {Observable, Subscriber} from "rxjs";
import {PmrService} from "../services/pmr-service/pmr.service";
import {Pmr} from "../models/Pmr";

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [],
  templateUrl: './carte.component.html',
  styleUrl: './carte.component.css'
})
export class CarteComponent implements OnInit, AfterViewInit {
  map: any;
  pmrService = inject(PmrService);
  dataPmr = new Array<Pmr>();


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadMap();
    this.pmrService.getAllPmr().subscribe({
      next: data => {
        this.dataPmr = data;
        this.updatePmrMarkers();
      },
      error: error => {},
    })
  }

  getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.getCurrentPosition()
      .subscribe((position: any) => {
        this.map.flyTo([position.latitude, position.longitude], 13);

        const icon = L.icon({
          iconUrl: 'assets/images/marker-icon.png',
          shadowUrl: 'assets/images/marker-shadow.png',
          popupAnchor: [13, 0],
        });

        // Dans le bindPopup, on peut mettre du code html dedans
        const marker = L.marker([position.latitude, position.longitude], { icon }).bindPopup('Angular Leaflet');
        marker.addTo(this.map);
      });
  }

  updatePmrMarkers(): void {
    // On supprimer tous les markers ayant pu être mis, avant de les mettre à jour ce qui les réaffichera

    for (const pmr of this.dataPmr) {
      const pos: string[] = pmr.point_geo.split(", ");
      const markerPmr = L.marker([Number(pos[0]), Number(pos[1])]);
      markerPmr.bindPopup( `${pmr.nom}, ${pmr.description}, ${pmr.quantite}`);
      markerPmr.addTo(this.map);
    }
  }

  clearAllMarkers(): void {
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    })
  }
}
