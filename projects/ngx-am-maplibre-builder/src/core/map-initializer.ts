import {Map as MapLibreMap} from 'maplibre-gl';
import {StyleSpecification} from '@maplibre/maplibre-gl-style-spec';
import {
  MapControl,
  MapEventHandler,
  MapLayer,
  MapOptions,
  MapSource
} from '../data/models/map-data.model';
import {MapControlManager} from './map-control-manager';
import {MapEventManager} from './map-event-manager';
import {MapSourceManager} from './map-source-manager';
import {MapLayerManager} from './map-layer-manager';

/**
 * Configuration interface for map initialization
 */
export interface MapInitializerConfig {
  containerId: string;
  options: MapOptions;
  style: StyleSpecification;
  controls?: MapControl[];
  eventHandlers?: MapEventHandler[];
  sources?: MapSource[];
  layers?: MapLayer[];
}

/**
 * Handles map initialization and lifecycle management
 * Orchestrates control, event, source, and layer managers
 */
export class MapInitializer {
  private map: MapLibreMap | null = null;
  private controlManager: MapControlManager | null = null;
  private eventManager: MapEventManager | null = null;
  private sourceManager: MapSourceManager | null = null;
  private layerManager: MapLayerManager | null = null;
  private readonly config: MapInitializerConfig;

  constructor(config: MapInitializerConfig) {
    this.config = config;
  }

  /**
   * Initializes the map with all configurations
   * @returns The initialized MapLibre map instance
   */
  public initialize(): MapLibreMap {
    this.createMap();
    this.setupManagers();
    this.applyStyle();
    this.setupSourcesAndLayers();

    return this.map!;
  }

  /**
   * Gets the map instance
   */
  public getMap(): MapLibreMap | null {
    return this.map;
  }

  /**
   * Cleans up resources and removes the map
   */
  public destroy(): void {
    this.eventManager?.unregisterEvents();
    this.layerManager?.removeLayers();
    this.sourceManager?.removeSources();
    this.controlManager?.detachControls();
    this.map?.remove();

    this.map = null;
    this.controlManager = null;
    this.eventManager = null;
    this.sourceManager = null;
    this.layerManager = null;
  }

  /**
   * Creates the base map instance
   */
  private createMap(): void {
    this.map = new MapLibreMap({
      ...this.config.options,
      container: this.config.containerId,
    });
  }

  /**
   * Sets up control and event managers
   */
  private setupManagers(): void {
    if (!this.map) {
      throw new Error('Map must be created before setting up managers');
    }

    this.controlManager = new MapControlManager(
      this.map,
      this.config.controls
    );
    this.controlManager.attachControls();

    this.eventManager = new MapEventManager(
      this.map,
      this.config.eventHandlers
    );
    this.eventManager.registerEvents();

    this.sourceManager = new MapSourceManager(
      this.map,
      this.config.sources
    );

    this.layerManager = new MapLayerManager(
      this.map,
      this.config.layers
    );
  }

  /**
   * Applies the map style
   */
  private applyStyle(): void {
    if (!this.map) {
      throw new Error('Map must be created before applying style');
    }

    this.map.setStyle(this.config.style);
  }

  /**
   * Sets up sources and layers after style is loaded
   * Sources must be added before layers that reference them
   */
  private setupSourcesAndLayers(): void {
    if (!this.map) {
      throw new Error('Map must be created before setting up sources and layers');
    }

    // Wait for style to load before adding sources and layers
    this.map.once('style.load', () => {
      this.sourceManager?.addSources();
      this.layerManager?.addLayers();
    });
  }
}