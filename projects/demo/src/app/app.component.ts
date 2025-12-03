import {Component, OnInit, signal} from '@angular/core';
import maplibregl from 'maplibre-gl';
import {AmMaplibreBuilderApi, AmMaplibreBuilderApiBuilder, } from "ngx-am-maplibre-builder";
import {DEFAULTS} from "../../../ngx-am-maplibre-builder/src/shared/constants/constant";
import {AmMaplibreBuilderComponent} from "../../../ngx-am-maplibre-builder/src/lib/ngx-am-maplibre-builder.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    AmMaplibreBuilderComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'demo';

  private readonly apiBuilder = new AmMaplibreBuilderApiBuilder();

  data = signal<AmMaplibreBuilderApi | null>(null);
  isShow: boolean = false;

  ngOnInit(): void {
    this.apiBuilder
      .setOptions(DEFAULTS.options)
      .setStyles(DEFAULTS.styles)
      .setControls([
        {
          control: new maplibregl.ScaleControl({unit: 'metric'}),
          position: 'bottom-right'
        },
        {
          control: new maplibregl.NavigationControl({showZoom: false}),
          position: 'bottom-left'
        },
        {
          control: new maplibregl.NavigationControl({showCompass: false}),
          position: 'bottom-left'
        },
        {
          control: new maplibregl.FullscreenControl({container: document.documentElement}),
          position: 'bottom-left'
        }
      ])
      .setEventHandlers([
        {
          eventName: 'load',
          handler: () => {
            console.log('Map loaded successfully!');
          }
        },
        {
          eventName: 'click',
          handler: (event: maplibregl.MapMouseEvent) => {
            console.log('Map clicked at:', event.lngLat);
          }
        },
        {
          eventName: 'zoom',
          handler: () => {
            console.log('Zoom level changed');
          }
        },
        {
          eventName: 'move',
          handler: () => {
            console.log('Map is moving');
          }
        }
      ])
      .setSources([
        {
          id: 'points-source',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [51.389, 35.6892] // Tehran
                  },
                  properties: {
                    title: 'Tehran',
                    description: 'Capital of Iran'
                  }
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [59.6168, 36.2974] // Mashhad
                  },
                  properties: {
                    title: 'Mashhad',
                    description: 'Second largest city'
                  }
                }
              ]
            }
          }
        }
      ])
      .setLayers([
        {
          layer: {
            id: 'points-layer',
            type: 'circle',
            source: 'points-source',
            paint: {
              'circle-radius': 8,
              'circle-color': '#007cbf',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff'
            }
          }
        },
        {
          layer: {
            id: 'points-label',
            type: 'symbol',
            source: 'points-source',
            layout: {
              'text-field': ['get', 'title'],
              'text-size': 12,
              'text-offset': [0, 1.5],
              'text-anchor': 'top'
            },
            paint: {
              'text-color': '#000000',
              'text-halo-color': '#ffffff',
              'text-halo-width': 2
            }
          }
        }
      ]);

    this.data.set(this.apiBuilder.build());
  }

}
