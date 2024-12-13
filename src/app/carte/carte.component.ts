import {
  Component,
  inject,
  OnInit,
  ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import * as L from 'leaflet';
import {Observable, Subscriber} from "rxjs";
import {PmrService} from "../services/pmr-service/pmr.service";
import {Pmr} from "../models/Pmr";

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [],
  templateUrl: './carte.component.html',
  styleUrl: './carte.component.css',
  encapsulation: ViewEncapsulation.None, // permet de désactiver l'encapsulation du CSS, ce qui rend le CSS de ce component global et non local
                                         // Dans notre cas cela permet de changer le CSS des éléments insérés dans les popup leaflet.
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
    let i = 0;
    for (const pmr of this.dataPmr) {
      const pos: string[] = pmr.point_geo.split(", ");
      const markerPmr = L.marker([Number(pos[0]), Number(pos[1])]);
      const popup = L.popup();
      //const appPopupMarker = this.vcr.createComponent(PopupmarkerComponent);
      //appPopupMarker.setInput("pmr", pmr);

      // On ajouter le component pour la popup dans l'élément de popup
      //popup.setContent(appPopupMarker.location.nativeElement);
      popup.setContent(this.createPopup(pmr));
      markerPmr.bindPopup( popup );
      markerPmr.addTo(this.map);

      i++;
      if (i > 50){
        console.log("Limit de point fixé à 50");
        break;
      }
    }
  }

  /**
   * Ca aurait été plus propre de faire un component pour faire le marker, mais ce n'est pas compatible avec leaflet
   */
  createPopup(pmr: Pmr): string {
    return `<a class="a_popup" href="pmr-details/${pmr.id}" target="_blank"><div>
      <div>Id : ${pmr.id}</div>
    <div>Nom : ${pmr.nom}</div>
    <div>Description : ${pmr.description}</div>
    <div>Point Geo : ${pmr.point_geo}</div>
    <div>Quantité : ${pmr.quantite}</div>
    </div></a>`;
  }

  clearAllMarkers(): void {
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    })
  }
}
