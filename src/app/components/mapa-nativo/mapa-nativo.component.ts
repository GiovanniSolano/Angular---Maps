/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts" />

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mapa-nativo',
  templateUrl: './mapa-nativo.component.html',
  styleUrls: ['./mapa-nativo.component.css']
})
export class MapaNativoComponent implements OnInit {


  @ViewChild('divMap') divMap: ElementRef;


  mapa: google.maps.Map;

  markers: google.maps.Marker[];


  constructor() {
    this.markers = [];
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(position => {
        this.cargarMapa(position);
        this.cargarAutocomplete();
      });

    } else {
      console.log('Navegador no compatible');
      
    }

  }

  cargarMapa(position) {
    const opciones = {

      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.HYBRID

    }


    this.mapa = new google.maps.Map(this.divMap.nativeElement, opciones);

    const icon = {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/714px-Google_Maps_icon_%282020%29.svg.png',
      scaledSize: new google.maps.Size(60, 60)
    }

    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      animation: google.maps.Animation.DROP,
      icon: icon
    });

    markerPosition.setMap(this.mapa);

    google.maps.event.addListener(this.mapa, 'click', (event: google.maps.MouseEvent) => {

      const marker = new google.maps.Marker({
        position: event.latLng,
        animation: google.maps.Animation.DROP
      });
      marker.setDraggable(true);
      marker.setMap(this.mapa);

      this.markers.push(marker);

      google.maps.event.addListener(marker, 'click', event => {

        marker.setMap(null);

      });

      google.maps.event.addListener(marker, 'mouseover', event => {

        marker.setAnimation(google.maps.Animation.BOUNCE);

      });
      google.maps.event.addListener(marker, 'mouseout', event => {

        marker.setAnimation(null);

      });
            
    });

  }

  borrarMarcadores() {
    for (const marker of this.markers) {

      marker.setMap(null);
      
    }
  }

  cargarAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(
      document.querySelector('#inputPlaces')
    );

    google.maps.event.addListener(autocomplete, 'place_changed', event => {

      const place = autocomplete.getPlace();
      console.log(place);

      // this.mapa.setCenter(place.geometry.location);
      // const marker = new google.maps.Marker({
      //   position: place.geometry.location
      // });

      // marker.setMap(this.mapa);

      this.calculaRuta(this.mapa.getCenter(), place.geometry.location, google.maps.TravelMode.WALKING);
      

    });

  }

  calculaRuta(pOrigen: string | google.maps.LatLng,
     pDestino: string | google.maps.LatLng,
     pModoViaje: google.maps.TravelMode = google.maps.TravelMode.DRIVING) {

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();


    directionsRenderer.setMap(this.mapa);
    directionsService.route({
      origin: pOrigen,
      destination: pDestino,
      travelMode: pModoViaje
    }, result => {
      directionsRenderer.setDirections(result);
    });

  }

}
