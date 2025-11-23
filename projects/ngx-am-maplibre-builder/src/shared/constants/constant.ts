import {LngLat} from "maplibre-gl";
import {StyleSpecification} from "@maplibre/maplibre-gl-style-spec";
import {MapOptions} from "../../data/models/map-data.model";

//-----------------------------------------------------------
export const DEFAULT_ZOOM = 4;
export const DEFAULT_MAX_ZOOM = 18;
export const DEFAULT_MIN_ZOOM = 1;
export const DEFAULT_MAP_CENTER: LngLat = new LngLat(51.40426, 35.730123);
export const DEFAULT_MAP_OPTIONS: MapOptions = {
  container: 'maplibregl-element',
  maxZoom: DEFAULT_MAX_ZOOM,
  minZoom: DEFAULT_MIN_ZOOM,
  zoom: DEFAULT_ZOOM,
  center: DEFAULT_MAP_CENTER,
}
//-----------------------------------------------------------
export const BASE_MAP_SOURCE_ID: string = 'raster-tiles';
export const BASE_MAP_LAYER_ID: string = 'simple-tiles';
export const DEFAULT_MAP_STYLES : StyleSpecification = {
  version: 8,
  sources: {
    [BASE_MAP_SOURCE_ID]: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: BASE_MAP_LAYER_ID,
      type: 'raster',
      source: 'raster-tiles',
      minzoom: 0,
      maxzoom: 19
    },
  ],
}
//-----------------------------------------------------------
export const DEFAULTS = {
  options: DEFAULT_MAP_OPTIONS,
  styles: DEFAULT_MAP_STYLES,
}

