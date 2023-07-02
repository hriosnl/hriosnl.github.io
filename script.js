window.onload = (event) => {
  // check if the Geolocation API is supported
  if (!navigator.geolocation) {
    console.error(`Your browser doesn't support Geolocation`);
    return;
  } else {
    console.warn("Geolocation possibly available.");
  }
  console.log("page is fully loaded");
};

/******************************************/
// Tingle Modal
var modalButton = document.querySelector(".report-button");
modalButton.addEventListener("click", function () {
  tingleModal.open();
});

var tingleModal = new tingle.modal({
  onClose: function () {
    console.log("close");
  },
  onOpen: function () {
    console.log("open");
  },
  beforeOpen: function () {
    console.log("before open");
  },
  beforeClose: function () {
    console.log("before close");
    return true;
  },
  footer: true,
  // cssClass: ['mapModal']
});
tingleModal.setContent(document.querySelector(".tingle-with-btn").innerHTML);
tingleModal.addFooterBtn(
  "Share this dog's location",
  "tingle-btn tingle-btn--danger tingle-btn--pull-right",
  function () {
    tingleModal.close();
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
);

var tingleModalWithMap = new tingle.modal({
  onClose: function () {
    console.log("close with map");
  },
  onOpen: function () {
    console.log("open with map");
  },
  beforeOpen: function () {
    console.log("before open with map");
  },
  beforeClose: function () {
    console.log("before close with map");
    return true;
  },
  footer: true,
});
tingleModalWithMap.addFooterBtn(
  "Confirm",
  "tingle-btn tingle-btn--default tingle-btn--pull-right",
  function () {
    console.warn("Showing mappppp");
  }
);

// handle success case
function onSuccess(position) {
  const { latitude, longitude } = position.coords;

  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGlyb3NsMTAwIiwiYSI6ImNsamw1Z2gzajByc2wza3BwNXhrajVpYjYifQ.UqwxM9V6ds4_u6ZH0EDxtw";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    center: [longitude, latitude], // starting position [lng, lat]
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    zoom: 15, // starting zoom
  });

  tingleModalWithMap.setContent(
    document.querySelector(".tingle-with-map").innerHTML
  );
  tingleModalWithMap.open();

  console.info(`Your location: (${latitude},${longitude})`);
  console.warn(map);
}

// handle error case
function onError() {
  console.error(`Failed to get your location!`);
}
