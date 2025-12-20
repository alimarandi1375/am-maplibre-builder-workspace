import {Map as MapLibreMap} from "maplibre-gl";
import {MapImage} from "../data/types/types";

/**
 * Manages map image lifecycle
 * Handles adding, removing, and updating image on the map
 */
export class MapImageManager{
  private readonly map: MapLibreMap;
  private readonly images: MapImage[];

  constructor(map: MapLibreMap, images: MapImage[] = []) {
    this.map = map;
    this.images = images;
  }


  /**
   * Adds all configured image to the map
   */
  public addImage(): void {
    if (!this.images || this.images.length === 0) {
      return;
    }

    this.images.forEach((image) => {
      if (image.src instanceof HTMLImageElement) {

        if (image.src.complete) {
          this.map.addImage(image.id, image.src);
        } else {
          image.src.onload = () => {
            if (!this.map.hasImage(image.id)) {
              this.map.addImage(image.id, image.src);
            }
          };

          image.src.onerror = () => {
            throw new Error(`Failed to load image: ${image.id}`);
          };
        }


      }
    });
  }

  /**
   * Removes all Image from the map
   */
  public removeImages(): void {
    if (!this.images || this.images.length === 0) {
      return;
    }

    // Remove in reverse order to handle dependencies
    [...this.images].reverse().forEach((image) => {
      this.map.removeImage(image.id);
    });
  }

  /**
   * Removes Images by ids from the map
   */
  public removeImagesByIds(ids: string[]): void {
    if (!this.images || this.images.length === 0 || ids.length === 0) {
      return;
    }

    ids.forEach((id) => {
      this.map.removeImage(id);
    });
  }

}
