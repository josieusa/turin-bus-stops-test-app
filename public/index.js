var pageLength = 10;


function setStop(i) {
	setDepartures(i);
	setMap(i);
}

function stops (items) {
  return yo`
	<div id="stops-group">
		${items.map(function ({ name, location, placeName, lines }, i) {
		  return yo`
			<div class="stop-item-container list-group-item" onclick=${setStop.bind(null, i)}>
			  <h4 class="stop-item-name list-group-item-heading">${name}</h4>
			  <p class="stop-item-location list-group-item-text">${location}</p>
			  <p class="list-group-item-text">${placeName}</p>
			  <p class="list-group-item-text">${lines.replace(/,/g, ', ')}</p>
			</div>`
		  })}
	</div>`
}

function map (uri) {
  return yo`<img src="${uri}">`
}

function departures (items) {
  return yo`
	<div id="departures-group">
		${items.map(function ({ name, longName, departures }) {
		  return yo`
			<div class="list-group-item">
			  <h4 class="list-group-item-heading">${name} ${longName}</h4>
			  
				${departures && departures.map(function ({ time, rt }) {
				return yo`<span class="list-group-item-text">${
					rt ? '*' : ''
					}${time} </span>`
				})}
			</div>`
		  })}
	</div>`
}

var stopsEl;
var lastJson;
var mapEl;
var departuresEl;
function setPage (pageNumber) {
  var offset = pageNumber * pageLength;
  fetch(`stops?limit=${pageLength}&offset=${offset}`).then(function(response) {
    response.json().then(json => {
	  lastJson = json;
      var newList = stops(json);
      if (!stopsEl) {
		stopsEl = newList;
      	document.getElementById('left-col-stops').appendChild(stopsEl);
	  } else {
		yo.update(stopsEl, newList);
      }
	  setDepartures(0);
	  setMap(0);
    });
  });
}
function setMap (listIndex) {
  var stop = lastJson[listIndex];
  fetch(`maps?coordinates=${stop.lat},${stop.lng}`).then(function(response) {
    response.json().then(json => {
      var newMap = map(json);
      if (!mapEl) {
		mapEl = newMap;
      	document.getElementById('right-col-map').appendChild(mapEl);
	  } else {
		yo.update(mapEl, newMap);
      }
    });
  });
}
function setDepartures (listIndex) {
  function updateDepartures(json) {
      var newDepartures = departures(json);
      if (!departuresEl) {
		departuresEl = newDepartures;
      	document.getElementById('right-col-departures').appendChild(departuresEl);
	  } else {
		yo.update(departuresEl, newDepartures);
      }
  }
  var stopId = lastJson[listIndex].id;
  var url = `departures?stopId=${stopId}`;
  fetch(url).then(function(response) {
	if (!response.ok) {
		console.log(`GET ${url} not ok, maybe 404 NOT FOUND`);
		updateDepartures([]);
		return;
	}
    response.json().then(updateDepartures);
  });
}

var page = 0;
setPage(page);
var prev = document.getElementById('prev');
var togglePrev = enabled => {
	if (enabled) {
		prev.className = 'btn btn-primary';
		prev.removeAttribute('disabled');
	} else {
		prev.className = 'btn btn-primary disabled';
		prev.setAttribute('disabled', true);
	}
}
prev.onclick = function() {
	if (prev.getAttribute('disabled') !== null) {
		return;
	}
	setPage(--page);
	togglePrev(page !== 0);
};
document.getElementById('next').onclick = () => {
	setPage(++page);
	togglePrev(true);
}
