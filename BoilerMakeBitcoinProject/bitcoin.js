// JavaScript Document

function grab_bitcoin_data()
{
	var auth_token = 'STJfiMUNzfE63xDVDTkm';
	var url_ochl = 'http://www.quandl.com/api/v1/datasets/BITCOIN/MTGOXUSD.json';
	var url_chain = 'http://www.quandl.com/api/v1/datasets/BCHAIN/MKPRU.json';
	var url_week = 'http://api.bitcoincharts.com/v1/markets.json';
	var url_weighted = 'http://api.bitcoincharts.com/v1/weighted_prices.json';
	
	var data = {
		trim_start: get_today(),
		sort_order: 'desc',
		auth_token: auth_token
	};
    
	$.get(url_ochl, data, function(response) {
		console.log(response);
		$('#open').text(response.data[0][1]);
		$('#close').text(response.data[0][4]);
		$('#high').text(response.data[0][2]);
		$('#low').text(response.data[0][3]);
	}, 'json');
	
	grab_weeklyavg();
	grab_current();
	
	function grab_weeklyavg()
	{  
		var average = "";
		$.get(url_weighted, function(response) {
            
			average += response.USD['7d'];
            console.log(average);
            //console.log(response[0]);
            //console.log(response[1]);
            //console.log(response.USD['7d']);
            $('#w_avg').text(average);
		}, 'json');
	}
	
	function grab_current()
	{
		var date = get_today();
		var current = 0;
		var data = {
			trim_start: date,
			trim_end: date,
			auth_token: auth_token,
			collapse: 'hourly'
		};
		
		$.get(url_chain, data, function(response) {
            console.log(response);
			current = response.data[0][1];
            $("#current").text(current);
		}, 'json');
		
		//return current;
	}
	
	function get_today()
	{
		var d = new Date('2/8/2014');
		var curr_date = d.getDate();
		if (curr_date < 10) curr_date = "0" + curr_date;
		var curr_month = d.getMonth() + 1;
		if (curr_month < 10) curr_month = "0" + curr_month;
		var curr_year = d.getFullYear();
		var date = curr_year + "-" + curr_month + "-" + curr_date;
		return date;
	}
	
}