import {StyleSpecification} from "@maplibre/maplibre-gl-style-spec";
import {
  MapControl,
  MapEventHandler,
  MapLayer,
  MapOptions,
  MapSource
} from "../../data/models/map-data.model";

/**
 * Main API interface for ngx-mini-map library
 */
export interface AmMaplibreBuilderApi {
  options: MapOptions;
  styles: StyleSpecification;
  controls?: MapControl[];
  eventHandlers?: MapEventHandler[];
  sources?: MapSource[];
  layers?: MapLayer[];
}

/**
 * Builder class for constructing AmMaplibreBuilderApi configuration
 */
export class AmMaplibreBuilderApiBuilder {
  private options!: MapOptions;
  private styles!: StyleSpecification;
  private controls?: MapControl[];
  private eventHandlers?: MapEventHandler[];
  private sources?: MapSource[];
  private layers?: MapLayer[];

  constructor() {}

  /**
   * Builds and returns the final AmMaplibreBuilderApi configuration
   */
  build(): AmMaplibreBuilderApi {
    return {
      options: this.options,
      styles: this.styles,
      controls: this.controls,
      eventHandlers: this.eventHandlers,
      sources: this.sources,
      layers: this.layers
    };
  }

  /**
   * Sets the map options
   */
  setOptions(options: MapOptions): this {
    this.options = options;
    return this;
  }

  /**
   * Sets the map styles
   */
  setStyles(styles: StyleSpecification): this {
    this.styles = styles;
    return this;
  }

  /**
   * Sets the map controls
   */
  setControls(controls: MapControl[]): this {
    this.controls = controls;
    return this;
  }

  /**
   * Sets the map event handlers
   */
  setEventHandlers(eventHandlers: MapEventHandler[]): this {
    this.eventHandlers = eventHandlers;
    return this;
  }

  /**
   * Sets the map sources
   */
  setSources(sources: MapSource[]): this {
    this.sources = sources;
    return this;
  }

  /**
   * Sets the map layers
   */
  setLayers(layers: MapLayer[]): this {
    this.layers = layers;
    return this;
  }
}
