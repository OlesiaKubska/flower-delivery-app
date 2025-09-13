import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

type MapProps = {
  lat: number;
  lng: number;
};

export default function Map({ lat, lng }: MapProps) {
  const center = { lat, lng };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      <Marker position={center} />
    </GoogleMap>
  );
}
