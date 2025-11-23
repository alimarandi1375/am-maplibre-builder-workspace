import {Map as MapLibreMap} from 'maplibre-gl';
import {MapEventHandler} from '../data/models/map-data.model';

/**
 * Manages map events lifecycle
 * Handles registering and unregistering event listeners
 */
export class MapEventManager {
  private readonly map: MapLibreMap;
  private readonly eventHandlers: MapEventHandler[];

  constructor(map: MapLibreMap, eventHandlers: MapEventHandler[] = []) {
    this.map = map;
    this.eventHandlers = eventHandlers;
  }

  /**
   * Registers all configured event listeners
   */
  public registerEvents(): void {
    if (!this.eventHandlers || this.eventHandlers.length === 0) {
      return;
    }

    this.eventHandlers.forEach(({eventName, handler}) => {
      this.map.on(eventName as any, handler);
    });
  }

  /**
   * Unregisters all event listeners
   */
  public unregisterEvents(): void {
    if (!this.eventHandlers || this.eventHandlers.length === 0) {
      return;
    }

    this.eventHandlers.forEach(({eventName, handler}) => {
      this.map.off(eventName as any, handler);
    });
  }
}