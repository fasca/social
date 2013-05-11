export function mt_rand(min, max)
{
	if(!min) min = Math.random();
	if(!max) max = Math.random();
	return Math.floor(Math.random()*(Number(max)-Number(min)+1))+Number(min);
}