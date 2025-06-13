
declare interface Window {
  initMap: () => void;
}

declare namespace google.maps {
  // Define the necessary Google Maps types here
  class Map {
    constructor(element: HTMLElement, options: MapOptions);
  }

  interface MapOptions {
    center: LatLng | LatLngLiteral;
    zoom: number;
    styles?: any[];
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    mapTypeControl?: boolean;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    icon?: string | Icon;
    title?: string;
    animation?: any;
  }

  interface Icon {
    url: string;
    scaledSize?: Size;
    size?: Size;
    origin?: Point;
    anchor?: Point;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
    equals(other: Point): boolean;
    toString(): string;
  }

  class InfoWindow {
    constructor(options?: InfoWindowOptions);
    open(options: InfoWindowOpenOptions): void;
    close(): void;
    setContent(content: string | Node): void;
  }

  interface InfoWindowOptions {
    content?: string | Node;
    disableAutoPan?: boolean;
    maxWidth?: number;
    pixelOffset?: Size;
    position?: LatLng | LatLngLiteral;
    zIndex?: number;
  }

  interface InfoWindowOpenOptions {
    map?: Map;
    anchor?: Marker;
  }

  class Size {
    constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
    width: number;
    height: number;
    equals(other: Size): boolean;
    toString(): string;
  }

  const Animation: {
    DROP: number;
    BOUNCE: number;
  };
}
