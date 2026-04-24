//////////////////////////////
// 🚨 REPORT SYSTEM (LOCAL STORAGE)
//////////////////////////////

function submitReport(event){
    if(event) event.preventDefault();

    let name = document.getElementById("name")?.value || "";
    let place = document.getElementById("place")?.value || "";
    let type = document.getElementById("type")?.value || "";
    let desc = document.getElementById("desc")?.value || "";

    let report = { name, place, type, desc };

    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push(report);

    localStorage.setItem("reports", JSON.stringify(reports));

    let msg = document.getElementById("successMsg") || document.getElementById("msg");
    if(msg){
        msg.style.display = "block";
        msg.innerText = "✅ Emergency Sent Successfully 🚑";
    }

    event.target.reset();

    return false;
}


//////////////////////////////
// 📊 LOAD DASHBOARD REPORTS
//////////////////////////////

window.addEventListener("load", function(){

    let container = document.getElementById("alertContainer");

    if(!container) return;

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    reports.forEach(r => {

        let card = document.createElement("div");
        card.className = "alert";

        card.innerHTML = `
            <h3>${r.type} Alert</h3>
            <p>📍 Location: ${r.place}</p>
            <p>👤 Reported by: ${r.name}</p>
            <p>${r.desc}</p>
            <p class="priority-high">HIGH PRIORITY</p>
            <button class="dispatch-btn" onclick="dispatchHelp()">Dispatch Help</button>
        `;

        container.appendChild(card);
    });

});


//////////////////////////////
// 🧠 DISPATCH SYSTEM (SIMULATION)
//////////////////////////////

function dispatchHelp(){
    alert("🚑 Emergency Services Dispatched!");
}


//////////////////////////////
// 🗺 GOOGLE MAP INITIALIZATION
//////////////////////////////

function initMap(){

    const location = { lat: 28.6139, lng: 77.2090 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: location
    });

    // USER
    new google.maps.Marker({
        position: location,
        map: map,
        title: "User 📍"
    });

    // SERVICES
    const services = [
        {pos:{lat:28.6200,lng:77.2300},title:"Hospital 🚑"},
        {pos:{lat:28.6000,lng:77.2100},title:"Fire Station 🔥"},
        {pos:{lat:28.6100,lng:77.2000},title:"Police 🛡"}
    ];

    services.forEach(s => {
        new google.maps.Marker({
            position: s.pos,
            map: map,
            title: s.title
        });
    });

    setTimeout(() => {
        let reach = document.getElementById("reach");
        if(reach){
            reach.innerText = "🚑 Fastest AI ETA: 4–6 minutes";
        }
    }, 1000);
}


//////////////////////////////
// 🤖 CHATBOT SYSTEM (FIXED)
//////////////////////////////

function toggleChat(){
    let box = document.getElementById("chatbox");
    if(!box) return;

    box.style.display = (box.style.display === "block") ? "none" : "block";
}


function sendMessage(){

    let input = document.getElementById("userInput");
    let log = document.getElementById("chatlog");

    if(!input || !log) return;

    let msg = input.value.trim();
    if(msg === "") return;

    let lower = msg.toLowerCase();

    log.innerHTML += `<p><b>You:</b> ${msg}</p>`;

    let reply = "⚠️ Stay calm. Help is being processed.";

    if(lower.includes("fire")){
        reply = "🔥 Fire emergency detected. Fire brigade alerted!";
    }
    else if(lower.includes("accident")){
        reply = "🚑 Ambulance is being dispatched!";
    }
    else if(lower.includes("police")){
        reply = "🛡 Police have been notified!";
    }
    else if(lower.includes("help")){
        reply = "🆘 Emergency system activated!";
    }

    log.innerHTML += `<p><b>AI:</b> ${reply}</p>`;

    input.value = "";
    log.scrollTop = log.scrollHeight;
}


//////////////////////////////
// ⌨ ENTER KEY SUPPORT
//////////////////////////////

document.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        let box = document.getElementById("chatbox");
        if(box && box.style.display === "block"){
            sendMessage();
        }
    }
});
