let loaction = "kathmandu";
let temp = document.querySelector(".temp p")
let locationName = document.querySelector(".location");
let localTime =document.querySelector(".time");
let condition = document.querySelector(".condition-type");
let search = document.querySelector(".search");
let btn = document.querySelector(".btn");

const fetchResults = async () => {
    let url = `http://api.weatherapi.com/v1/current.json?key=a099bae8e59242cba8c123031252109&q=${loaction}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    locationName = data.location.name;
    localTime = data.location.localtime;
    condition = data.current.condition.text;
    temp = data.current.temp_c;
    console.log(temp);
    console.log(locationName)
    console.log(condition);
    console.log(localTime);
}
