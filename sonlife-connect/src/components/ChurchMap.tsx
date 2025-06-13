import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

// Import Google Maps types
/// <reference types="@types/google.maps" />

// Add Google Maps types
declare global {
  interface Window {
    google: typeof google;
  }
}

const CHURCH_LOCATION = {
  lat: 7.3349,  // Sunyani latitude
  lng: -2.3123, // Sunyani longitude
  address: "Off Sunyani-Berekum Rd, Sunyani",
  name: "Sonlife City Church"
};

const ChurchMap = () => {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // Load Google Maps API
    const loadMap = async () => {
      try {
        setIsMapLoading(true);
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        
        const loadPromise = new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load Google Maps'));
        });

        document.head.appendChild(script);
        await loadPromise;
        initializeMap();
      } catch (error) {
        console.error('Error loading map:', error);
        setMapError('Failed to load the map. Please try again later.');
      } finally {
        setIsMapLoading(false);
      }
    };

    loadMap();

    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initializeMap = () => {
    const mapElement = document.getElementById('church-map');
    if (!mapElement) {
      console.error('Map container not found');
      return;
    }

    try {
      const map = new google.maps.Map(mapElement, {
        center: CHURCH_LOCATION,
        zoom: 15,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          }
        ]
      });

      // Add church marker
      new google.maps.Marker({
        position: CHURCH_LOCATION,
        map,
        title: CHURCH_LOCATION.name,
        icon: {
          url: '/church-marker.svg',
          scaledSize: new google.maps.Size(48, 48),
          anchor: new google.maps.Point(24, 24)
        }
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize the map. Please try again later.');
    }
  };

  const getDirections = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position);
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${CHURCH_LOCATION.lat},${CHURCH_LOCATION.lng}&origin=${position.coords.latitude},${position.coords.longitude}`;
          window.open(directionsUrl, '_blank');
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to static directions
          const staticDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${CHURCH_LOCATION.lat},${CHURCH_LOCATION.lng}`;
          window.open(staticDirectionsUrl, '_blank');
          setIsLoadingLocation(false);
        }
      );
    } else {
      // Fallback for browsers that don't support geolocation
      const staticDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${CHURCH_LOCATION.lat},${CHURCH_LOCATION.lng}`;
      window.open(staticDirectionsUrl, '_blank');
      setIsLoadingLocation(false);
    }
  };

  const openStaticMap = () => {
    const staticMapUrl = `https://www.google.com/maps/search/?api=1&query=${CHURCH_LOCATION.lat},${CHURCH_LOCATION.lng}`;
    window.open(staticMapUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl overflow-hidden shadow-lg">
        {isMapLoading ? (
          <div className="w-full h-[400px] flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-sonlife-blue border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        ) : mapError ? (
          <div className="w-full h-[400px] flex items-center justify-center bg-gray-100">
            <div className="text-center text-red-500 px-4">
              <p>{mapError}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-sonlife-blue hover:bg-sonlife-gold"
              >
                Retry
              </Button>
            </div>
          </div>
        ) : (
          <div id="church-map" className="w-full h-[400px]"></div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-sonlife-blue mt-1" />
          <div>
            <h3 className="font-medium text-lg">Church Location</h3>
            <p className="text-gray-600">{CHURCH_LOCATION.address}</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={getDirections}
            className="flex-1 bg-sonlife-blue hover:bg-sonlife-gold transition-colors duration-300 text-white flex items-center justify-center gap-2"
            disabled={isLoadingLocation}
          >
            <Navigation className="h-4 w-4" />
            {isLoadingLocation ? 'Getting Location...' : 'Get Live Directions'}
          </Button>
          
          <Button
            onClick={openStaticMap}
            variant="outline"
            className="flex-1 border-sonlife-blue text-sonlife-blue hover:bg-sonlife-blue/10 flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View on Google Maps
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChurchMap;
