import {ControlPosition, IControl} from "maplibre-gl";
import type {
  LayerSpecification,
  SourceSpecification
} from "@maplibre/maplibre-gl-style-spec";

/**
 * Type alias for MapLibre GL map options
 */
export type MapOptions = maplibregl.MapOptions;

/**
 * Represents a map control with its position
 */
export interface MapControl {
  control: IControl;
  position?: ControlPosition;
}

/**
 * Represents a map event with its handler
 */
export interface MapEventHandler<T = any> {
  eventName: string;
  handler: (event: T) => void;
}

/**
 * Represents a map source with its ID and data
 */
export interface MapSource {
  id: string;
  source: SourceSpecification;
}

/**
 * Represents a map layer configuration
 */
export interface MapLayer {
  layer: LayerSpecification;
  beforeId?: string;
}
