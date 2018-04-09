

function setup()
{
	
createCanvas(400,400);

loadJSON("http://api.open-notify.org/astros.json",gotData, 'jsonp');

}
function gotData(data)
{
	background(0);
	for (var i = 0;i < data.number;i++)
	{
	
		fill(255);
		ellipse(random(200), random(200), 50,50);
	}
}
