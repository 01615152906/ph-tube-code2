// console.log("sdsafgsrtgrtyh")
/**8**/
const showloader = () =>{
  document.getElementById("loader").classList.remove("hidden")
  document.getElementById("video-container").classList.add("hidden")
}
const hideloader = () =>{
  document.getElementById("loader").classList.add("hidden")
  document.getElementById("video-container").classList.remove("hidden")
}


/***6**/ 
function removeActiveClass(){
  const activeButtons = document.getElementsByClassName("active")
  // console.log(activeButtons);
  for(let btn of activeButtons){
    btn.classList.remove("active")
  }
}



/**1*/   
function loadCategories (){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) =>res.json())
    .then((data) =>displayCategories(data.categories
))
}


//**3* */ 
function loadVideos ( searchText = "") {
showloader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchText}`)
    .then((res) =>res.json())
    .then((data) => {
removeActiveClass();
      document.getElementById("btn-all").classList.add("active");

      displayVideos(data.videos)
    })
}


/**5*/ 

const loadCategoryVideo = (id) =>{
// console.log(id)
showloader();
const url = `
https://openapi.programming-hero.com/api/phero-tube/category/${id}
`;
// console.log(url)
fetch(url)
.then(res =>res.json())
.then(data =>{

  removeActiveClass();
  const clickedButton = document.getElementById(`btn-${id}`);
  // console.log(clickedButton);
  clickedButton.classList.add("active")
   displayVideos (data.category)
})

}



// 4
const displayVideos = (videos) =>{
// console.log(videos)
const videoContainer = document.getElementById("video-container")
videoContainer.innerHTML = " ";
if(videos.length === 0){
  videoContainer.innerHTML = `
  <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
<img class="w-[120px] " src="assets/Icon.png" alt="">

  <h1 class="font-bold text-2xl">Oops!! Sorry, There is no <br>content here</h1>
</div>


  `;
  hideloader();
  return;
}
videos.forEach((video) => {
    // console.log(video)

const videoCard = document.createElement("div");
videoCard.innerHTML = `

  <div class="card bg-base-100 ">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover"
      src="${video.thumbnail}" />
      <span class="absolute bottom-2 right-2 text-sm text-white bg-black px-2 rounded ">3hrs 56 min ago</span>
  </figure>
  <div class="py-5 flex gap-3 px-0">

    <div>
<div class="avatar">
  <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
    <img src="${video.authors[0].profile_picture}" />
  </div>
</div>
    </div>

    <div>
      <h2 class="text-sm font-semibold"> ${video.title}</h2>
      <p class="text-sm text-gray-400 gap-1 flex">
      ${video.authors[0].profile_name}
      ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : `` }
      

        
      </p>
      <p class="text-sm text-gray-400">${video.others.views} views
 </p>
    </div>


  </div>

  <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
</div>


`

videoContainer.append(videoCard)

});
hideloader();

}

const loadVideoDetails = (videoId) => {
// console.log(videoId)
const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
fetch(url)
.then(res =>res.json())
.then(data =>displayVideoDetails(data.video));
}

const displayVideoDetails = (video) =>{
// console.log(video)
document.getElementById("video_details").showModal();
const detailsContainer = document.getElementById("details-container");
detailsContainer.innerHTML = `

 <div class="card bg-base-100 ">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover"
      src="${video.thumbnail}" />
      <span class="absolute bottom-2 right-2 text-sm text-white bg-black px-2 rounded ">3hrs 56 min ago</span>
  </figure>
  <div class="py-5 flex gap-3 px-0">

    <div>
<div class="avatar">
  <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
    <img src="${video.authors[0].profile_picture}" />


  </div>
</div>
    </div>

    <div>
      <h2 class="text-sm font-semibold"> ${video.title}</h2>
      <p class="text-sm text-gray-400 gap-1 flex">
      ${video.authors[0].profile_name}
      ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : `` }
        
      </p>
      <p class="text-sm text-gray-400">${video.others.views} views
 </p>
      <p class="text-sm font-bold ">${video.description} views
 </p>




    </div>


  </div>

</div>

`


}
//**2* */ 
function displayCategories (categories) {
// console.log(categories);


const categoryContainer = document.getElementById("category-container");
for(let cat of categories){
// console.log(cat)

const categoryDiv = document.createElement("div");
categoryDiv.innerHTML = `
<button id="btn-${cat.category_id}" onclick="loadCategoryVideo( ${cat.category_id} )" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
`
categoryContainer.append(categoryDiv);
}
}


//***7* */ 
document.getElementById("search-input").addEventListener("keyup", (e) =>{
const input = e.target.value;
// console.log(input)
loadVideos(input);
})

loadCategories();
// loadVideos();