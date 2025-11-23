import {Map as MapLibreMap} from 'maplibre-gl';
import {MapSource} from '../data/models/map-data.model';

/**
 * Manages map sources lifecycle
 * Handles adding and removing data sources from the map
 */
export class MapSourceManager {
  private readonly map: MapLibreMap;
  private readonly sources: MapSource[];

  constructor(map: MapLibreMap, sources: MapSource[] = []) {
    this.map = map;
    this.sources = sources;
  }

  /**
   * Adds all configured sources to the map
   * Sources must be added before layers that reference them
   */
  public addSources(): void {
    if (!this.sources || this.sources.length === 0) {
      return;
    }

    this.sources.forEach(({id, source}) => {
      if (!this.map.getSource(id)) {
        this.map.addSource(id, source);
      }
    });
  }

  /**
   * Removes all sources from the map
   * Note: Layers using these sources must be removed first
   */
  public removeSources(): void {
    if (!this.sources || this.sources.length === 0) {
      return;
    }

    // Remove in reverse order to handle dependencies
    [...this.sources].reverse().forEach(({id}) => {
      if (this.map.getSource(id)) {
        this.map.removeSource(id);
      }
    });
  }

  /**
   * Updates an existing source data
   */
  public updateSource(sourceId: string, data: any): void {
    const source = this.map.getSource(sourceId);
    if (source && source.type === 'geojson') {
      (source as maplibregl.GeoJSONSource).setData(data);
    }
  }
}