// JavaScript Document

function validation(element)
{
	var $cc = $("#cc");
	var $cp = $("#cp");
	
	if (!$(element).is(":checked"))
	{
		if ($(element).val() == 'companycurrent')
		{
			if ($cp.is(":checked"))
			{
				return false;	
			}
		}
		else
		{
			if ($cc.is(":checked"))
			{
				return false;	
			}
		}
	}
}

function grab_bitcoin_data()
{
	var auth_token = 'STJfiMUNzfE63xDVDTkm';
	var url_ochl = 'http://www.quandl.com/api/v1/datasets/BITCOIN/MTGOXUSD.json';
	var url_chain = 'http://www.quandl.com/api/v1/datasets/BCHAIN/MKPRU.json';
	var url_weighted = 'http://api.bitcoincharts.com/v1/weighted_prices.json';
	
	var data_ochl = {
		trim_start: get_today(),
		sort_order: 'desc',
		auth_token: auth_token
	};
	
	$.get(url_ochl, data_ochl, function(response) {
		if (response.data[0])
		{
			$('#open').text(response.data[0][1]);
			$('#close').text(response.data[0][4]);
			$('#high').text(response.data[0][2]);
			$('#low').text(response.data[0][3]);
			
			if (response.data[0][1])
				data.datasets[1].data.push(parseInt(response.data[0][1]));
				
			//if (response.data[0][4])
				//data.datasets[2].data.push(parseInt(response.data[0][4]));
			
			if (response.data[0][2])
				data.datasets[1].data.push(parseInt(response.data[0][2]));
			
			if (response.data[0][2])
				data.datasets[1].data.push(parseInt(response.data[0][3]));
		}
	}, 'json');
	
	grab_weeklyavg();
	grab_current();
	
	function grab_weeklyavg()
	{
		var average;
		$.get(url_weighted, function(response) {
			average = response.USD['7d'];
			$('#w_avg').text(average);
			if (average)
				data.datasets[2].data.push(average);
		}, 'json');
		
	}
	
	function grab_current()
	{
		var date = get_today();
		var current;
		var data_chain = {
			trim_start: date,
			trim_end: date,
			auth_token: auth_token,
			collapse: 'hourly'
		};
		
		$.get(url_chain, data_chain, function(response) {
			if (response[0])
			{
				current = response[0][1];
				$('#current').text(current);
				data.datasets[2].data.push(current);
			}
			
		}, 'json');
		
	}
	
	function get_today()
	{
		//this doesn't do the current date yet...
		var d = new Date('2/9/2014');
		var curr_date = d.getDate();
		if (curr_date < 10) curr_date = "0" + curr_date;
		var curr_month = d.getMonth() + 1;
		if (curr_month < 10) curr_month = "0" + curr_month;
		var curr_year = d.getFullYear();
		var date = curr_year + "-" + curr_month + "-" + curr_date;
		return date;
	}
	
}

var loaded = 0;
var data = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
	  {
		 fillColor : "rgba(220,220,220,0.5)",   //LOW HIGH OPEN
		 strokeColor : "rgba(220,220,220,1)",   //bt past
		 data : []
	  },
	  {
		 fillColor : "rgba(151,187,205,0.5)",
		 strokeColor : "rgba(151,187,205,1)",    //bt current
		 data : []
	  },
	  {
		 fillColor : "rgba(151,187,205,0.5)",
		 strokeColor : "rgba(151,187,205,1)",    //comp past
		 data : []
	  },
	  {
		 fillColor : "rgba(151,187,205,0.5)",
		 strokeColor : "rgba(151,187,205,1)",     //comp current
		 data : []
	  }
   ]
}

//  0   is HIGH
//  1   is OPEN
//  2   is LOW


// my code
$(function() {
	
	
	$.get('http://localhost/BoilerMakeBitcoinProject/Overstock_data.txt', function(res) {
		var myvar = res;
		var overstock_arr = find_hist(myvar);
		$('#overstock_past').val(overstock_arr);
		console.log("first");
		loaded += 1;
		
		if (overstock_arr[1])
			data.datasets[2].data.push(parseInt(overstock_arr[1]));
			
		if (overstock_arr[0])
			data.datasets[2].data.push(parseInt(overstock_arr[0]));
			
		if (overstock_arr[2])
			data.datasets[2].data.push(parseInt(overstock_arr[2]));
	});
	
	$.get('http://localhost/BoilerMakeBitcoinProject/Tesla_data.txt', function(res) {
		var myvar = res;
		var tesla_arr = find_hist(myvar);
		$('#tesla_past').val(tesla_arr);
		loaded += 1;
		console.log("second");
		if (tesla_arr[1])
			data.datasets[2].data.push(parseInt(tesla_arr[1]));
			
		if (tesla_arr[0])
			data.datasets[2].data.push(parseInt(tesla_arr[0]));
			
		if (tesla_arr[2])
			data.datasets[2].data.push(parseInt(tesla_arr[2]));
	});
	
	$.get('http://localhost/BoilerMakeBitcoinProject/Zynga_data.txt', function(res) {
		var myvar = res;
		var zynga_arr = find_hist(myvar);
		$('#zynga_past').val(zynga_arr);
		loaded += 1;
		console.log("third");
		if (zynga_arr[0])
			data.datasets[3].data.push(parseInt(zynga_arr[0]));
			
		if (zynga_arr[1])
			data.datasets[3].data.push(parseInt(zynga_arr[1]));
			
		if (zynga_arr[2])
			data.datasets[3].data.push(parseInt(zynga_arr[2]));
		
		console.log(data);
	});
	
	function find_hist(file) 
	{
		var index = file.indexOf("HIGH = ");
		var offset = 0;
		while (file[index + offset] !== ".")
		{
			offset += 1;	
		}
		
		var high = file.slice(index + 7, index + offset + 7);
		
		index = file.indexOf("LOW = ");
		offset = 0;
		while (file[index + offset] !== ".")
		{
			offset += 1;	
		}
		
		var low = file.slice(index + 6, index + offset + 7);
		
		index = file.indexOf("OPEN = ");
		offset = 0;
		while (file[index + offset] !== ".")
		{
			offset += 1;	
		}
		
		var opn = file.slice(index + 7, index + offset + 7);
		
		
			var ctx = new Chart($("#myChart").get(0).getContext("2d")).Bar(data);
		
		grab_bitcoin_data();
		
		return [high, low, opn];
	}
	
	
});


/*var ctx = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(ctx).Bar(data);*/

