"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

export default function Map({ latitude, longitude, zoom }: MapProps) {
  useEffect(() => {
    // Create map
    const map = L.map("map").setView([latitude, longitude], zoom);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add marker
    L.marker([latitude, longitude]).addTo(map);

    // Cleanup
    return () => {
      map.remove();
    };
  }, [latitude, longitude, zoom]);

  return <div id="map" className="h-[400px] w-full rounded-lg shadow-lg" />;
}
