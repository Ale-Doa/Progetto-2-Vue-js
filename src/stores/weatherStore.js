import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    weatherData: null, 
    loading: false,    
    error: null,     
  }),

  actions: {
    async fetchWeather(city) {
      const apiKey = "d4b77d27f155a9f3e14a84ba372b5a04";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
      try {
        this.loading = true;
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error("Errore nella risposta delle API");
        }
    
        const data = await response.json();
        this.weatherData = data;
        this.loading = false;
        return data; 
      } catch (error) {
        this.error = error;
        this.loading = false;
        console.error("Errore durante la chiamata API:", error);
        return null;
      }
    }
  },
});