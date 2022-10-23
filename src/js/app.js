const App = () => {
  // !Display the Map
  const mapRender = (coords) => {
    const map = L.map("map").setView(coords, 9);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  };

  const renderIpData = async (data) => {
    const { city, country, geonameId, lat, lng } = data.location;
    console.log(lat, lng);
    mapRender([lat, lng], 20);
  };

  // !Search IP Data
  const getIpdata = async (ip) => {
    try {
      const req = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_htJl99CqfTwgkKxXTvbZcy6ZYDIaE&ipAddress=${ip}`
      );
      const data = await req.json();
      renderIpData(data);
    } catch (err) {
      console.warn(err);
    }
  };

  // !Render Default IP

  const renderDefaultdata = async () => {
    // ! Fetch Client IP
    const req = await fetch("https://api.ipify.org?format=json");
    const data = await req.json();
    getIpdata(data.ip);
  };
  renderDefaultdata();

  // !Render IP Search Result
  const renderIpSearch = () => {
    const form = document.querySelector(".ip__form");
    const ip = document.querySelector(".ip__form>input");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      getIpdata(ip.value);
    });
  };
  renderIpSearch();
};

App();
