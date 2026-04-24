//////////////////////////////
// SUBMIT REPORT
//////////////////////////////

function submitReport(event){

event.preventDefault();

let name=document.getElementById("name").value;
let place=document.getElementById("place").value;
let type=document.getElementById("type").value;
let desc=document.getElementById("desc").value;

let report={
name:name,
place:place,
type:type,
desc:desc
};

let reports=JSON.parse(localStorage.getItem("reports")) || [];

reports.push(report);

localStorage.setItem("reports",JSON.stringify(reports));

document.getElementById("successMsg").style.display="block";

}

//////////////////////////////
// LOAD REPORTS IN DASHBOARD
//////////////////////////////

window.onload=function(){

let container=document.getElementById("alertContainer");

if(!container) return;

let reports=JSON.parse(localStorage.getItem("reports")) || [];

reports.forEach(function(r){

let card=document.createElement("div");
card.className="alert";

card.innerHTML=`

<h3>${r.type} Alert</h3>
<p>Location: ${r.place}</p>
<p>Reported by: ${r.name}</p>
<p>${r.desc}</p>
<p class="priority-high">High Priority</p>

<button class="dispatch-btn">
Dispatch Help
</button>

`;

container.appendChild(card);

});

};




//////////////////////////////
// 🚨 REPORT SYSTEM
//////////////////////////////

function submitReport(event){

if(event) event.preventDefault();

let msg = document.getElementById("msg");

if(msg){
msg.innerText = "✅ Emergency sent to authorities 🚑";
}

// small demo alert (optional)
console.log("Emergency report submitted");

return false;
}

//////////////////////////////
// 🗺 GOOGLE MAP INIT
//////////////////////////////


function initMap(){

   const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: 28.6139, lng: 77.2090 }
   });


// map
const map = new google.maps.Map(document.getElementById("map"),{
zoom: 12,
center: location
});

// user marker
new google.maps.Marker({
position: location,
map: map,
title: "User Location 📍"
});

// hospital
new google.maps.Marker({
position: { lat: 28.6200, lng: 77.2300 },
map: map,
title: "Hospital 🚑"
});

// fire station
new google.maps.Marker({
position: { lat: 28.6000, lng: 77.2100 },
map: map,
title: "Fire Station 🔥"
});

// police
new google.maps.Marker({
position: { lat: 28.6100, lng: 77.2000 },
map: map,
title: "Police Station 🛡"
});

// reach time
setTimeout(()=>{
let reach = document.getElementById("reach");
if(reach){
reach.innerText = "🚑 Estimated Fastest Reach Time: 4–6 minutes (AI Optimized)";
}
},1000);

}

//////////////////////////////
// 🤖 CHATBOT SYSTEM
//////////////////////////////

function toggleChat(){

let chat=document.getElementById("chatbox");

if(chat.style.display==="block"){
chat.style.display="none";
}else{
chat.style.display="block";
}
}

function sendMessage(){

let input=document.getElementById("userInput");
let chatlog=document.getElementById("chatlog");

let msg = input.value.trim();

if(msg==="") return;

// user message
chatlog.innerHTML += "<p><b>You:</b> "+msg+"</p>";

let reply="⚠️ Please stay calm. Help is being processed.";

// smarter logic (FIXED with else-if)
if(msg.toLowerCase().includes("fire")){
reply="🔥 Fire detected: Stay away and call fire brigade immediately.";
}
else if(msg.toLowerCase().includes("accident")){
reply="🚑 Accident reported: Checking nearest ambulance availability.";
}
else if(msg.toLowerCase().includes("help")){
reply="🆘 Emergency assistance activated. Help is on the way.";
}
else if(msg.toLowerCase().includes("police")){
reply="🛡 Police units are being notified in your area.";
}

// AI response
chatlog.innerHTML += "<p><b>AI:</b> "+reply+"</p>";

// auto scroll
chatlog.scrollTop = chatlog.scrollHeight;

// clear input
input.value="";
}

//////////////////////////////
// ENTER KEY SUPPORT (optional but pro)
//////////////////////////////

document.addEventListener("keypress", function(e){
if(e.key === "Enter"){
let box = document.getElementById("chatbox");
if(box && box.style.display==="block"){
sendMessage();
}
}
});