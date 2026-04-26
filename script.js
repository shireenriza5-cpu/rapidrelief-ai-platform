/////////////////////////////////////////////
// 🚑 AI CIVIC PLATFORM - FINAL SCRIPT.JS
/////////////////////////////////////////////

// Initialize map
var map = L.map('map').setView([28.6139, 77.2090], 12); // Delhi

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


/////////////////////////////////////////////
// 🎨 ICONS
/////////////////////////////////////////////

const blueIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    iconSize: [32, 32]
});

const redIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32]
});

const yellowIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    iconSize: [32, 32]
});

const orangeIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
    iconSize: [32, 32]
});

const purpleIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
    iconSize: [32, 32]
});


/////////////////////////////////////////////
// 📍 SAMPLE SERVICE LOCATIONS
/////////////////////////////////////////////

const hospitalLocation = [28.7041, 77.1025];
const policeLocation = [28.5355, 77.3910];
const fireLocation = [28.4595, 77.0266];
const ngoLocation = [28.4089, 77.3178];


/////////////////////////////////////////////
// 🚀 CREATE MARKERS (ONLY ONCE)
/////////////////////////////////////////////

let userMarker = null;

let hospitalMarker = L.marker(hospitalLocation, { icon: redIcon }).addTo(map);
let policeMarker = L.marker(policeLocation, { icon: yellowIcon }).addTo(map);
let fireMarker = L.marker(fireLocation, { icon: orangeIcon }).addTo(map);
let ngoMarker = L.marker(ngoLocation, { icon: purpleIcon }).addTo(map);


/////////////////////////////////////////////
// 🎯 MOVE FUNCTION (NO DUPLICATES + STOP)
/////////////////////////////////////////////

function moveMarker(marker, start, end) {

    let lat = start[0];
    let lng = start[1];

    let steps = 120;
    let stepLat = (end[0] - start[0]) / steps;
    let stepLng = (end[1] - start[1]) / steps;

    let count = 0;

    let interval = setInterval(() => {

        if (count >= steps) {
            clearInterval(interval);        // ✅ STOP
            marker.setLatLng(end);          // exact destination
            return;
        }

        lat += stepLat;
        lng += stepLng;

        marker.setLatLng([lat, lng]);       // ✅ UPDATE ONLY (NO NEW MARKER)

        count++;

    }, 40); // smooth speed
}


/////////////////////////////////////////////
// 🧠 HANDLE REPORT SUBMISSION
/////////////////////////////////////////////

function handleReport(type, userLocation) {

    // Remove old user marker (avoid duplicates)
    if (userMarker) {
        map.removeLayer(userMarker);
    }

    // Create new user marker (blue)
    userMarker = L.marker(userLocation, { icon: blueIcon }).addTo(map);

    // Center map
    map.setView(userLocation, 13);

    /////////////////////////////////////////////
    // 🔥 LOGIC BASED MOVEMENT
    /////////////////////////////////////////////

    if (type === "medical") {
        moveMarker(hospitalMarker, hospitalLocation, userLocation);
    }

    else if (type === "accident") {
        moveMarker(policeMarker, policeLocation, userLocation);
    }

    else if (type === "fire") {
        moveMarker(fireMarker, fireLocation, userLocation);
    }

    else if (type === "food" || type === "shelter") {
        moveMarker(ngoMarker, ngoLocation, userLocation);
    }
}


/////////////////////////////////////////////
// 🧪 DEMO (REMOVE WHEN CONNECTED TO BACKEND)
/////////////////////////////////////////////

// Example trigger (simulate report)
setTimeout(() => {

    let type = "fire"; // change this to test
    let userLocation = [28.61, 77.23];

    handleReport(type, userLocation);

}, 2000);

function calculateRisk(type, desc){

desc = desc.toLowerCase();

let score = 0;

// base score by type
if(type==="fire") score += 80;
if(type==="medical") score += 70;
if(type==="disaster") score += 90;
if(type==="food") score += 50;
if(type==="ngo") score += 40;

// keyword intelligence
if(desc.includes("urgent") || desc.includes("critical")) score += 20;
if(desc.includes("death") || desc.includes("bleeding")) score += 30;
if(desc.includes("accident")) score += 25;
if(desc.includes("fire spreading")) score += 35;

return Math.min(score,100);
}

function submitReport(e){
e.preventDefault();

let report = {
name: name.value,
place: place.value,
type: type.value,
desc: desc.value,
risk: calculateRisk(type.value, desc.value),
time: new Date()
};

db.collection("reports").add(report);

msg.innerText="✅ Emergency sent with AI Priority!";
}

// CHATBOT (SMART)
function toggleChat(){
chatbox.style.display = chatbox.style.display==="block"?"none":"block";
}

function sendMessage(){
let msgText = userInput.value.toLowerCase();

chatlog.innerHTML += "<p>You: "+msgText+"</p>";

let reply="⚠️ Stay calm. Help is being processed.";

// smarter responses
if(msgText.includes("fire")){
reply="🔥 Move away immediately. Fire team alerted.";
}
else if(msgText.includes("bleeding")){
reply="🩸 Apply pressure and seek medical help urgently.";
}
else if(msgText.includes("earthquake")){
reply="🌍 Move to open area. Avoid buildings.";
}
else if(msgText.includes("help")){
reply="🆘 Your request is prioritized by AI.";
}

chatlog.innerHTML += "<p>AI: "+reply+"</p>";
userInput.value="";
}
