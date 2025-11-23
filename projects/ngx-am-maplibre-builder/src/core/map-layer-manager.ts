import {Map as MapLibreMap} from 'maplibre-gl';
import {MapLayer} from '../data/models/map-data.model';

/**
 * Manages map layers lifecycle
 * Handles adding, removing, and updating layers on the map
 */
export class MapLayerManager {
  private readonly map: MapLibreMap;
  private readonly layers: MapLayer[];

  constructor(map: MapLibreMap, layers: MapLayer[] = []) {
    this.map = map;
    this.layers = layers;
  }

  /**
   * Adds all configured layers to the map
   * Layers are added in order, sources must exist before adding layers
   */
  public addLayers(): void {
    if (!this.layers || this.layers.length === 0) {
      return;
    }

    this.layers.forEach(({layer, beforeId}) => {
      if (!this.map.getLayer(layer.id)) {
        this.map.addLayer(layer, beforeId);
      }
    });
  }

  /**
   * Removes all layers from the map
   * Layers should be removed before their sources
   */
  public removeLayers(): void {
    if (!this.layers || this.layers.length === 0) {
      return;
    }

    // Remove in reverse order to handle dependencies
    [...this.layers].reverse().forEach(({layer}) => {
      if (this.map.getLayer(layer.id)) {
        this.map.removeLayer(layer.id);
      }
    });
  }

  /**
   * Updates layer visibility
   */
  public setLayerVisibility(layerId: string, visible: boolean): void {
    if (this.map.getLayer(layerId)) {
      this.map.setLayoutProperty(
        layerId,
        'visibility',
        visible ? 'visible' : 'none'
      );
    }
  }

  /**
   * Updates layer opacity
   */
  public setLayerOpacity(layerId: string, opacity: number): void {
    const layer = this.map.getLayer(layerId);
    if (!layer) return;

    const opacityProperty = this.getOpacityProperty(layer.type);
    if (opacityProperty) {
      this.map.setPaintProperty(layerId, opacityProperty, opacity);
    }
  }

  /**
   * Gets the appropriate opacity property based on layer type
   */
  private getOpacityProperty(layerType: string): string | null {
    const opacityMap: Record<string, string> = {
      'fill': 'fill-opacity',
      'line': 'line-opacity',
      'circle': 'circle-opacity',
      'symbol': 'icon-opacity',
      'raster': 'raster-opacity',
      'fill-extrusion': 'fill-extrusion-opacity',
      'heatmap': 'heatmap-opacity'
    };

    return opacityMap[layerType] || null;
  }
}