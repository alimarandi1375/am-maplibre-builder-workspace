# ngx-am-maplibre-builder

A flexible Angular library for building MapLibre GL maps with a simple and intuitive builder pattern API.

## Features

- 🏗️ **Builder Pattern API** - Clean and chainable API for map configuration
- 🎯 **Type-Safe** - Full TypeScript support with comprehensive type definitions
- 🎨 **Flexible** - Support for custom styles, controls, layers, and sources
- 📦 **Lightweight** - Minimal dependencies and tree-shakeable
- 🔧 **Easy Integration** - Simple setup with Angular standalone components
- 🗺️ **Full MapLibre Support** - Access to all MapLibre GL features

## Installation

```bash
npm install ngx-am-maplibre-builder maplibre-gl
```

## Quick Start

### 1. Import the Component

```typescript
import { Component, OnInit, signal } from '@angular/core';
import { AmMaplibreBuilderComponent, AmMaplibreBuilderApiBuilder, AmMaplibreBuilderApi } from 'ngx-am-maplibre-builder';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AmMaplibreBuilderComponent],
  template: `
    <lib-ngx-mini-map [data]="mapConfig()" />
  `
})
export class AppComponent implements OnInit {
  mapConfig = signal<AmMaplibreBuilderApi | null>(null);

  ngOnInit(): void {
    const builder = new AmMaplibreBuilderApiBuilder();

    const config = builder
      .setOptions({
        center: [51.389, 35.6892], // Tehran coordinates
        zoom: 10
      })
      .setStyles({
        version: 8,
        sources: {},
        layers: []
      })
      .build();

    this.mapConfig.set(config);
  }
}
```

### 2. Add MapLibre CSS

Add to your `angular.json` or import in your global styles:

```json
{
  "styles": [
    "node_modules/maplibre-gl/dist/maplibre-gl.css"
  ]
}
```

Or in your global CSS file:

```css
@import 'maplibre-gl/dist/maplibre-gl.css';
```

## Advanced Usage

### Adding Controls

```typescript
builder.setControls([
  {
    control: new maplibregl.NavigationControl(),
    position: 'top-right'
  },
  {
    control: new maplibregl.ScaleControl({ unit: 'metric' }),
    position: 'bottom-right'
  },
  {
    control: new maplibregl.FullscreenControl(),
    position: 'top-right'
  }
]);
```

### Adding Event Handlers

```typescript
builder.setEventHandlers([
  {
    eventName: 'load',
    handler: () => {
      console.log('Map loaded!');
    }
  },
  {
    eventName: 'click',
    handler: (event: maplibregl.MapMouseEvent) => {
      console.log('Clicked at:', event.lngLat);
    }
  }
]);
```

### Adding Sources and Layers

```typescript
builder
  .setSources([
    {
      id: 'points',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [51.389, 35.6892]
              },
              properties: {
                title: 'Tehran'
              }
            }
          ]
        }
      }
    }
  ])
  .setLayers([
    {
      layer: {
        id: 'points-layer',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 8,
          'circle-color': '#007cbf'
        }
      }
    }
  ]);
```

## API Reference

### AmMaplibreBuilderApiBuilder

#### Methods

- `setOptions(options: MapOptions): this` - Set map initialization options
- `setStyles(styles: StyleSpecification): this` - Set map style configuration
- `setControls(controls: MapControl[]): this` - Add map controls
- `setEventHandlers(handlers: MapEventHandler[]): this` - Add event handlers
- `setSources(sources: MapSource[]): this` - Add data sources
- `setLayers(layers: MapLayer[]): this` - Add map layers
- `build(): AmMaplibreBuilderApi` - Build and return the final configuration

### Types

```typescript
interface MapOptions {
  center?: [number, number];
  zoom?: number;
  pitch?: number;
  bearing?: number;
  // ... other MapLibre options
}

interface MapControl {
  control: IControl;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

interface MapEventHandler {
  eventName: string;
  handler: (event?: any) => void;
}

interface MapSource {
  id: string;
  source: SourceSpecification;
}

interface MapLayer {
  layer: LayerSpecification;
}
```

## Requirements

- Angular 17.3.0 or higher
- MapLibre GL 5.13.0 or higher

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please use the [GitHub issue tracker](https://github.com/YOUR_USERNAME/ngx-am-maplibre-builder/issues).
