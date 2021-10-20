function Youtube() {
  let nextPageToken;
  const preparedList = [];
  this.initialise = () => {
    mainExecution();
  }
  // To Play video in iframe
  function playVideo(item) {
    let date = item.pubTime.split('-');
    let iframe = document.querySelector('iframe');
    let detail = document.getElementById('details');
    iframe.setAttribute('src' , `https://www.youtube.com/embed/${item.videoId}`);
    detail.innerHTML = `${item.title}<div class="blockquote-footer mt-2 text-white">Published on :  ${date[1]} ${date[0]}</div><hr><small>Video Description : <br>${item.desc}</small>`;
  }
  // To prepare data from AJAX response
  function prepareData (data) {
    for(let i = 0 ; i < data.items.length; i++) {
      const result = {
        title : data.items[i].snippet.title,
        desc : data.items[i].snippet.description,
        pubTime : data.items[i].snippet.publishTime,
        image : data.items[i].snippet.thumbnails.default,
        videoId : data.items[i].id.videoId,
      };
      preparedList.push(result);
    }
  }
  // To display video results in rightContainer
  function showResults(preparedList) {
    let rightContainer = document.getElementById('rightContainer');
    let template = document.getElementById('template').innerHTML;
    let rendered = Mustache.render(template, { items : preparedList });
    rightContainer.innerHTML = rendered;
    return preparedList;
  }
  // To make an AJAX call
  function searchHandler () {
    //Instantiate xhr object
    const xhr = new XMLHttpRequest();
    // To prepare URL
    let search = document.forms['search'];
    let searchInput = search['inputText']['value'];
    let key = 'AIzaSyDyyEQRnqlRcr3YnDxryvMXKpNYOvKs2Wc';
    let keyOld = 'AIzaSyBqipI6tG4xgxq7Y1ZQ4E67oTeniq8fWcc';
    let keyNew = 'AIzaSyB8nJWtVhaVc7AyB03z-uqsjLRf7YZvBWE';
    let url = `https://www.googleapis.com/youtube/v3/search?key=${keyNew}%20&part=snippet&q=${search['inputText']['value']}&maxResults=40&type=video`;
    if(nextPageToken) {
        url = `${url}&pageToken=${nextPageToken}`
    }
    // Open the request Object
    xhr.open('GET', url, true);
    // action on progress
    xhr.onprogress = () => {
      console.log('On progress');
    }
    // Actions when response is prepared
    xhr.onload = function () {
      const data = JSON.parse(this.response);
      nextPageToken = data.nextPageToken;
      // To prepare required data from response and show results on document
      prepareData(data);
      showResults(preparedList);
      // To play video in iframe
      playVideo(preparedList[1]);
      // To add 'click' event on each video result in rightContainer
      preparedList.map(list => {
        document.getElementById(`play${list.videoId}`).addEventListener('click', () => {
          playVideo(list);
        });
      });
    }
    // send the request
    xhr.send();
  }
  // To load videos when scroll hits the bottom of the document 
  function loadMore(preparedList) {
    if( window.scrollY === (document.body.clientHeight - window.innerHeight)) {
      searchHandler();
    }
  }
  // Main execution context
  function mainExecution () {
    // Results when the page is loaded
    searchHandler(preparedList);
    // Results when search button is clicked
    let fetchData = document.getElementById('fetchData');
    fetchData.addEventListener('click', (e) => { 
      // To empty previous results
      preparedList.splice(0, preparedList.length);
      nextPageToken = undefined;
      searchHandler();
    });
    // Results when scroll hits the bottom
    document.addEventListener('scroll', (e, preparedList) => { loadMore(preparedList);});
  }
}