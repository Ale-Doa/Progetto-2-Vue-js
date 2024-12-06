<template>
    <div class="solar-dashboard">
        <WeatherDashboard @weather-updated="updateWeatherData" />

        <div class="energy-dashboard">
            <PowerProduction :weatherData="weatherData" />
            <TodaysEnergy :weatherData="weatherData" />
            <LeftTimeEnergy :weatherData="weatherData" />
            <MonthEnergy :weatherData="weatherData" />
        </div>
        <DailyKwhCounter :weatherData="weatherData" />
    </div>
</template>

<script>
import { ref } from 'vue';
import { useWeatherStore } from "@/stores/weatherStore";
import WeatherDashboard from './WeatherDashboard.vue';
import PowerProduction from './PowerProduction.vue';
import TodaysEnergy from './TodaysEnergy.vue';
import LeftTimeEnergy from './LeftTimeEnergy.vue';
import MonthEnergy from './MonthlyEnergy.vue';
import DailyKwhCounter from './DailyKwhCounter.vue';

export default {
    components: {
        WeatherDashboard,
        PowerProduction,
        TodaysEnergy,
        LeftTimeEnergy,
        MonthEnergy,
        DailyKwhCounter
    },
    setup() {
        const weatherStore = useWeatherStore();
        const city = ref('Rome');  // Default city
        const weatherData = ref(null);

        const updateWeatherData = async (selectedCity) => {
            city.value = selectedCity;
            try {
                // Chiamata API per ottenere i dati meteo
                weatherData.value = await weatherStore.fetchWeather(selectedCity);
            } catch (error) {
                console.error("Errore nel recupero dei dati meteo:", error);
            }
        };

        return {
            city,
            weatherData,
            updateWeatherData
        };
    }
};
</script>

<style scoped>
.solar-dashboard {
    max-width: 500px;
    border: 1px solid black;
    border-radius: 70px;
    margin: 5% auto 0 auto;
}

.energy-dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 30px 0 30px;
}

@media screen and (max-width: 450px) {
    .solar-dashboard {
        max-width: 300px;
        border: none;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>