const App = () => {
  // !Display the Map
  const mapRender = (coords, zoom) => {
    const map = L.map("map").setView(coords, zoom);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  };

  // mapRender([51.505, -0.09], 13);

  // !Get IP Data
  const getIpdata = async (ip) => {
    try {
      console.log("sdf");
      const req = await fetch(
        `https://geo.ipify.org/api/v2/country?apiKey=at_htJl99CqfTwgkKxXTvbZcy6ZYDIaE&ipAddress=${ip}`
      );
      const data = await req.json();
      return data;
    } catch (err) {
      console.warn(err);
    }
  };

  // !Render IP Data
  const renderIpData = async () => {
    const ip = document.querySelector(".ip__form>input").data;
    const data = await getIpdata("8.8.8.8");
    console.log(data);
  };

  renderIpData();
};

App();

// const test = async () => {
//   const req = await fetch(
//     "https://geo.ipify.org/api/v2/country?apiKey=at_htJl99CqfTwgkKxXTvbZcy6ZYDIaE&ipAddress=8.8.8.8"
//   );
//   const data = await req.json();
//   console.log(data);
// };
