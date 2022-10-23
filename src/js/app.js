const App = () => {
  // !init the Map

  const map = L.map("map");

  const mapRender = (coords) => {
    const mapContainer = document.getElementById("map");
    if (mapContainer.classList.contains("leaflet-container")) {
      map.setView(coords, 10);
    }
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  };

  const renderIpData = async (data) => {
    const phIpAdress = document.querySelector(".ip__info--adress>p");
    const phLocation = document.querySelector(".ip__info--location>p");
    const phTimezone = document.querySelector(".ip__info--timezone>p");
    const phIsp = document.querySelector(".ip__info--isp>p");
    const { city, lat, lng, timezone } = data.location;
    const ipAdress = data.ip;
    const isp = data.isp;
    mapRender([lat, lng]);
    phIpAdress.textContent = ipAdress;
    phLocation.textContent = city;
    phTimezone.textContent = timezone;
    phIsp.textContent = isp;
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
