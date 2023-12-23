import React from "react";
import axios from "axios";

export default function UserLocation() {
  const gotLocationSuccessfully = async (position) => {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    console.log(`latitude: ${latitude}`, `longitude: ${longitude}`);
  };

  const failedToGetLocation = () => {
    alert("Failed to get your current position");
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      gotLocationSuccessfully,
      failedToGetLocation,
      {
        enableHighAccuracy: true,
      }
    );
  };

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function UserLocation() {
//   const [ipAddress, setIpAddress] = useState("");
//   const [location, setLocation] = useState({});

//   useEffect(() => {
//     getVisitorIP();
//   }, []);

//   const getVisitorIP = async () => {
//     try {
//       const res = await fetch("https://api.ipify.org");
//       const data = await res.text();
//       setIpAddress(data);
//       fetchIPInfo();
//     } catch (error) {
//       console.log(`Failed to fetch IP:`, error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setIpAddress(e.target.value);
//   };

//   const fetchIPInfo = async () => {
//     try {
//       //   const data = await axios.get(`https://ipapi.co/json`);
//       //   console.log(data.data);
//       //or
//       const res = await fetch(`http://ip-api.com/json/${ipAddress}`);
//       const data = await res.json();
//       console.log(data);
//       setLocation(data);
//     } catch (error) {
//       console.log(`Faild to fetch location Info.`, error);
//     }
//   };

//   return (
//     <div>
//       {/* get ipAddress and show in input and also change in sowing input */}
//       <input type="text" value={ipAddress} onChange={handleInputChange} />
//       <button onClick={fetchIPInfo}>Get Info</button>
//       {location.country && (
//         <ul>
//           <li>
//             <strong>Country:</strong>
//             {location.country}-{location.countryCode}
//           </li>
//           <li>
//             <strong>RegionName:</strong>
//             {location.regionName}-{location.region}
//           </li>
//           <li>
//             <strong>City :</strong>
//             {location.city}
//           </li>
//           <li>
//             <strong>Lat & Lon:</strong>
//             {location.lat}, {location.lon}
//           </li>
//           <li>
//             <strong>Timezone:</strong>
//             {location.timezone}
//           </li>
//           <li>
//             <strong>Zip:</strong>
//             {location.zip}
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// }
