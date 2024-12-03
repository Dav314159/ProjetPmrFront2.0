import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  inject,
  OnInit,
  Renderer2, ViewContainerRef
} from '@angular/core';
import * as L from 'leaflet';
import {Observable, Subscriber} from "rxjs";
import {PmrService} from "../services/pmr-service/pmr.service";
import {Pmr} from "../models/Pmr";
import {PopupmarkerComponent} from "./popupmarker/popupmarker.component";
import {Layer} from "leaflet";

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [PopupmarkerComponent],
  templateUrl: './carte.component.html',
  styleUrl: './carte.component.css'
})
export class CarteComponent implements OnInit {
  map: any;
  pmrService = inject(PmrService);
  vcr = inject(ViewContainerRef);
  dataPmr = new Array<Pmr>();

  ngOnInit() {
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
      });
  }

  updatePmrMarkers(): void {
    // On supprimer tous les markers ayant pu être mis, avant de les mettre à jour ce qui les réaffichera
    this.clearAllMarkers();

    // On ajoute tous les points sur la carte
    for (const pmr of this.dataPmr) {
      const pos: string[] = pmr.point_geo.split(", ");
      const markerPmr = L.marker([Number(pos[0]), Number(pos[1])]);
      const popup = L.popup();
      const appPopupMarker = this.vcr.createComponent(PopupmarkerComponent);

      // Tour de magie, pour éviter que le component ne s'affiche à la fin de la page HTML
      appPopupMarker.hostView.destroy();

      // On ajouter le component pour la popup dans l'élément de popup
      popup.setContent(appPopupMarker.location.nativeElement);
      markerPmr.bindPopup( popup ); // `${pmr.nom}, ${pmr.description}, ${pmr.quantite}`
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
