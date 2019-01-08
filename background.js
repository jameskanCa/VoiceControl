///<reference types="chrome"/>


chrome.tabs.query({windowType:'normal'}, function(tabs) {
    console.log('Number of open tabs in all normal browser windows:',tabs.length);
}); 


function refresh() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://voicebrowserpoc-65c7c.firebaseio.com/tabs.json", true);
    xhttp.send();
    xhttp.addEventListener("readystatechange", processRequest, false);
function processRequest(e) {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        var response = JSON.parse(xhttp.responseText);
        var numberString = response.number;
        console.log(numberString); 
        
        chrome.tabs.query({index: parseInt(numberString)}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {active: true});
        }); 
        
       
      }

     
    }
    setTimeout(refresh, 1000);
  }
  refresh();