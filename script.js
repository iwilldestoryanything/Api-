let btn =  document.getElementById('submit')
let input = document.getElementById('search')
let output = document.querySelector('#output')

btn.addEventListener('click', (e) =>{
    getDataItunes()
})



const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}


function getDataItunes(){
    let url = 'https://itunes.apple.com/search?term='+ input.value;
    
   
    fetch(url)
    .then( data => data.json() )
    .then(json => {
        console.log(json)  
        let finalHTML = ''
        
        json.results.forEach( song => {
          
            finalHTML +=

            `
            <div class="container">
           
            <div class="picture">
                <img src="${song.artworkUrl100}" alt="" srcset="">
            </div>
    
          
            <ul class="information">
            <li><div>${song.artistName}</div></li>
            <li><div>${song.trackCensoredName}</div></li>
            <li><div>${song.collectionName}</div></li>
            <li><div>${song.primaryGenreName}</div></li>
            </ul>
            <div class="btn-details">
                <span class="btn"><i class="fa-solid fa-plus" id="pls-btn"></i></span>
            </div>
        </div>
        <div class="more-details" hidden>
            
            <h2>${song.trackCensoredName} -${song.trackCensoredName}<i class="fa-solid fa-music"></i> </h2>
            
            <div class="details">
                <ul>
                    <li><b>Collection:</b>${song.collectionName}</li>
                    <li><b>Track count:</b>${song.trackCount}</li>
                    <li><b>Price:</b> ${song.collectionPrice} USD</li>
                </ul>
            </div>
    
            <div class="details">
                <ul>
                    <li><b>Track duration:</b>${millisToMinutesAndSeconds(song.trackTimeMillis)} min</li>
                    <li><b>Track price:</b> ${song.trackPrice} USD</li>
                </ul>
            </div>
    
        </div>
    `  
        });
        output.innerHTML = finalHTML

        const BtnDeatails = document.querySelectorAll('.btn');
    
const showDetails = (e) => { 
    document.querySelectorAll('.btn').forEach(btn =>{
        btn.classList.remove('opened');
        btn.closest('.container').nextElementSibling.hidden = true
    })
    const elem = e.target; 
    const MorekDetails = elem.closest('.container').nextElementSibling;
    MorekDetails.hidden = false;
    elem.closest('.btn').classList.add('opened'); 
}

BtnDeatails.forEach(item => item.addEventListener('click', showDetails));

    })
    .catch(error => console.log(error))
}

