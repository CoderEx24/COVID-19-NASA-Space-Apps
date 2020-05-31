//Getting the data
var data = null
var APIurl = "https://api.covid19api.com/summary"
var req = new XMLHttpRequest()

req.onreadystatechange = function() {
	var canv = document.getElementById('chart')
	var ctx = canv.getContext('2d')
	
	if (this.readystatus === 4 && this.status !== 200) {
		ctx.fillText("Oops!\nCouldn't get the data :\'<", 10, 50)
		return
		
	}
	
	data = JSON.parse(this.responseText);
	data.Countries = data.Countries.filter((country, i) => i <= 20)
	
	var chart = new Chart(ctx, {
		type : 'bar',
		data : {
			labels : data.Countries.map((country) => country.Country),//replace with counties
			datasets : [ {
				label : 'infected',
				data: data.Countries.map((country) => country.TotalConfirmed),
				backgroundColor : [ 'rgba(255, 99, 132, 0.2)' ],
				borderColor : [ 'rgba(255, 99, 132, 1)' ],
				borderWidth : 10
			}, {
				label : 'recovered',
				data: data.Countries.map((country) => country.TotalRecovered),//put here the data
				backgroundColor : [ 'rgba(99,255,132,0.2)' ],
				borderColor : [ 'rgba(99, 255, 132, 1)' ],
				borderWidth : 10
			}, {
				label : 'dead',
				data : data.Countries.map((country) => country.TotalDeaths),//put here the data
				backgroundColor : [ 'rgba(99,255,132,0.2)' ],
				borderColor : [ 'rgba(99, 255, 132, 1)' ],
				borderWidth : 1
			} ]
		},
		options : {
			scales : {
				yAxes : [ {
					ticks : {
						beginAtZero : true
					}
				} ]
			}
		}
	});

};

req.open("GET", APIurl, true);
req.send();
