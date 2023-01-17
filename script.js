let aqi = {
  apikey: "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b", //API key for fetching AQI 
  fetchaqi: function (city) {
    fetch(
      "https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key="+this.apikey+"&format=json&offset=0&filters[city]="+city)
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })

      .then((data) => this.displayaqi(data));
  },
  displayaqi: function (data) {
    const { name } = data;
    const { country }=data.records[0];
    const { state }=data.records[0]; 
    const { city }=data.records[0]; 
    const { station }=data.records[0];
    const { last_update }=data.records[0];
    const { pollutant_id }=data.records[0];
    document.querySelector(".country").innerText = country;
    document.querySelector(".city").innerText = "Air Quality in " + city;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/50n.png";

    document.querySelector(".state").innerText = state; 
    document.querySelector(".station").innerText ="station : "+ station;
    document.querySelector(".pollutant_id").innerText="Pollutant : "+ pollutant_id;
    if(data.records[0].pollutant_avg=="NA"){
      const { pollutant_avg }=data.records[2];
      document.querySelector(".pollutant_avg").innerText="Pollution Level : "+pollutant_avg+" Aqi";
      if(pollutant_avg>=1 && pollutant_avg<=50){
        document.querySelector(".alert").innerHTML="Good";
        document.querySelector(".alert").style.color="LawnGreen"
      }
      if(pollutant_avg>=51 && pollutant_avg<=100){
        document.querySelector(".alert").innerHTML="Moderate";
        document.querySelector(".alert").style.color="LawnGreen";
      }
      if(pollutant_avg>=101 && pollutant_avg<=150){
        document.querySelector(".alert").innerHTML="Unhealthy For Sensitive People";
        document.querySelector(".alert").style.color="Orange";
      }
      if(pollutant_avg>=151 && pollutant_avg<=200){
        document.querySelector(".alert").innerHTML="Unhealthy"; 
        document.querySelector(".alert").style.color="OrangeRed";
      }
      if(pollutant_avg>=201 && pollutant_avg<=300){
        document.querySelector(".alert").innerHTML="Very Unhealthy";
        document.querySelector(".alert").style.color="Red";
      }
      if(pollutant_avg>=300 && pollutant_avg<=500){
        document.querySelector(".alert").innerHTML="Hazardous";
        document.querySelector(".alert").style.color="OrangeRed";
      }
    }
    if(data.records[0].pollutant_avg!="NA"){
      const { pollutant_avg }=data.records[0];
      document.querySelector(".pollutant_avg").innerText="Pollution Level : "+pollutant_avg+" Aqi";
      if(pollutant_avg>=1 && pollutant_avg<=50){
        document.querySelector(".alert").innerHTML="Good";
        document.querySelector(".alert").style.color="LawnGreen"
      }
      if(pollutant_avg>=51 && pollutant_avg<=100){
        document.querySelector(".alert").innerHTML="Moderate";
        document.querySelector(".alert").style.color="LawnGreen";
      }
      if(pollutant_avg>=101 && pollutant_avg<=150){
        document.querySelector(".alert").innerHTML="Unhealthy For Sensitive People";
        document.querySelector(".alert").style.color="Orange";
      }
      if(pollutant_avg>=151 && pollutant_avg<=200){
        document.querySelector(".alert").innerHTML="Unhealthy";
        document.querySelector(".alert").style.color="OrangeRed";
      }
      if(pollutant_avg>=201 && pollutant_avg<=300){
        document.querySelector(".alert").innerHTML="Very Unhealthy";
        document.querySelector(".alert").style.color="Red";
      }
      if(pollutant_avg>=300 && pollutant_avg<=500){
        document.querySelector(".alert").innerHTML="Hazardous";
        document.querySelector(".alert").style.color="Red";
      }
    }
    
    document.querySelector(".last_update").innerText="Last Update On : "+last_update;
    
    
    
    document.querySelector(".aqi").classList.remove("loading");
    
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + city + "')";
  },
  search: function () {
    this.fetchaqi(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  aqi.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      aqi.search();
    }
  });

aqi.fetchaqi("Delhi");
