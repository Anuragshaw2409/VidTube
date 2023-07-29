

const menuButton= document.getElementById("menu");

const sideBar=document.getElementById("sidebar");
const shortSideBar=document.getElementById("short-sidebar");
let currentSideBar=0; //indicates big sidebar
const vidContainer=document.getElementById("vidContainer");

menuButton.addEventListener('click',()=>{
    if (currentSideBar===0){
        //   removing big sidebar and adding small sidebar
            currentSideBar=1;
            sideBar.classList.add("hidden");
            shortSideBar.classList.remove("hidden");
            vidContainer.style.setProperty('--grid-columns', '4');
            vidContainer.style.setProperty('--sidebar-width', '100px');
            
            
        }
        
        else{
            // adding big sidebar and removing small sidebar
            currentSideBar=0;
            sideBar.classList.remove("hidden");
            shortSideBar.classList.add("hidden");
            vidContainer.style.setProperty('--grid-columns', '3');
            vidContainer.style.setProperty('--sidebar-width', '260px');
        }

});

window.onload=navAnimation();

function navAnimation(){
    setTimeout(()=>{
        
        document.getElementById("Nav").style.setProperty('--width',"100%");
    },100);
    setTimeout(()=>{
      
        document.getElementById("Nav").style.setProperty('--bg',"transparent");
    },2000);
    
   
}




const api_key="AIzaSyCEpX3d4Y5WcCk36sUWFP6OcrAauyilQTg";
const video_http="https://www.googleapis.com/youtube/v3/videos?";
const creator_dp_http="https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http+new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'

}))
.then(res=> res.json())
.then((data)=> Array.from (data.items).forEach(item => {
    // console.log(item);
    
    const template=document.getElementById("template_video_item").content.cloneNode(true);
    pushData(template, item);
    document.getElementById("vidContainer").appendChild(template);
    
}))



async function pushData(template, items){
    const thumbnail=template.querySelector("#thumbnail");
    const creatorDp=template.querySelector("#creator_dp");
    const vidTitle=template.querySelector("#vid-title");
    const channel= template.querySelector("#channel");
    const views=template.querySelector("#views");
    console.log(items);

    thumbnail.src = items.snippet.thumbnails.maxres.url;
    vidTitle.innerHTML= items.snippet.localized.title.substring(0, 50)+"...";
    channel.innerHTML=items.snippet.channelTitle;
    const dpURL = await fetchdpURL(items);
    creatorDp.src=items.snippet.thumbnails.default;
    

}

async function fetchdpURL(itemfrom){

    let res=await fetch(creator_dp_http+new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: itemfrom.snippet.channelId
    }));
    data= await res.json();
    console.log(data.items);
    itemfrom.snippet.thumbnails.default= data.items[0].snippet.thumbnails.default.url;
    console.log(itemfrom.snippet.thumbnails.default);
}



