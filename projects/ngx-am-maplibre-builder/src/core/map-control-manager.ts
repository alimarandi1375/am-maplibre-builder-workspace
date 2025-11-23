import {Map as MapLibreMap} from 'maplibre-gl';
import {MapControl} from '../data/models/map-data.model';

/**
 * Manages map controls lifecycle
 * Handles adding and removing controls from the map
 */
export class MapControlManager {
  private readonly map: MapLibreMap;
  private readonly controls: MapControl[];

  constructor(map: MapLibreMap, controls: MapControl[] = []) {
    this.map = map;
    this.controls = controls;
  }

  /**
   * Adds all configured controls to the map
   */
  public attachControls(): void {
    if (!this.controls || this.controls.length === 0) {
      return;
    }

    this.controls.forEach(({control, position}) => {
      this.map.addControl(control, position || 'top-right');
    });
  }

  /**
   * Removes all controls from the map
   */
  public detachControls(): void {
    if (!this.controls || this.controls.length === 0) {
      return;
    }

    this.controls.forEach(({control}) => {
      this.map.removeControl(control);
    });
  }
}