function initMap(){

const userLocation = { lat: 28.6139, lng: 77.2090 };

// map
const map = new google.maps.Map(document.getElementById("map"),{
zoom: 12,
center: userLocation
});

// RESOURCE DATA (THIS IS THE REAL MAGIC)
const resources = [
{
name:"🚑 Hospital",
position:{lat:28.6200,lng:77.2300},
time:"4 min",
color:"red"
},
{
name:"🔥 Fire Station",
position:{lat:28.6000,lng:77.2100},
time:"6 min",
color:"orange"
},
{
name:"🍞 Food Supply Center",
position:{lat:28.6150,lng:77.2000},
time:"5 min",
color:"green"
},
{
name:"🏠 Shelter",
position:{lat:28.6300,lng:77.2200},
time:"7 min",
color:"blue"
}
];

// USER MARKER
new google.maps.Marker({
position:userLocation,
map:map,
title:"Your Location 📍"
});

// ADD RESOURCE MARKERS
resources.forEach((res)=>{

let marker = new google.maps.Marker({
position:res.position,
map:map,
title:res.name
});

// INFO WINDOW (IMPORTANT FEATURE)
let info = new google.maps.InfoWindow({
content: `<h3>${res.name}</h3>
<p>⏱ Reach Time: ${res.time}</p>`
});

marker.addListener("click",()=>{
info.open(map,marker);
});

});

// SHOW FASTEST RESPONSE
document.getElementById("reach").innerText =
"🚑 Fastest Resource Reach Time: 4 minutes (Hospital)";
}