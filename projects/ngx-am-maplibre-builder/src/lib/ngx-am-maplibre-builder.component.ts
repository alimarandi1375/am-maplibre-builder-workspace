import {Component, Input, input, OnChanges, OnDestroy, signal, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {AmMaplibreBuilderApi} from "../shared/builder/input-builder";
import {MapInitializer} from "../core/map-initializer";
import {Subscription} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";

@Component({
  selector: 'ngx-am-maplibre-builder',
  standalone: true,
  template: `
    <div
      style="width: 100%; height: 100%"
      id="maplibregl-element"
    ></div>
  `,
  styleUrls: [
    '../assets/css/maplibregl-config-css.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AmMaplibreBuilderComponent implements OnDestroy, OnChanges {
  private static readonly MAP_CONTAINER_ID = 'maplibregl-element';

  private mapInitializer: MapInitializer | null = null;

  @Input() config!: AmMaplibreBuilderApi|null;

  mapConfigs = signal<AmMaplibreBuilderApi|null>(null)

  /**
   * Observes input data changes and reinitializes map when needed
   */

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      if (this.config) {
        this.mapConfigs.set(this.config);
        this.initializeMap(this.config);
      }
    }
  }

  /**
   * Initializes the map with provided configuration
   */
  private initializeMap(config: AmMaplibreBuilderApi): void {
    // Cleanup previous instance if exists
    this.cleanup();

    this.mapInitializer = new MapInitializer({
      containerId: AmMaplibreBuilderComponent.MAP_CONTAINER_ID,
      options: config.options,
      style: config.styles,
      controls: config.controls,
      eventHandlers: config.eventHandlers,
      sources: config.sources,
      layers: config.layers,
      images: config.images,
    });

    this.mapInitializer.initialize();
  }

  /**
   * Cleans up resources
   */
  private cleanup(): void {
    this.mapInitializer?.destroy();
    this.mapInitializer = null;
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}
