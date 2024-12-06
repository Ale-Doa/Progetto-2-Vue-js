<template>
    <div class="weather-dashboard">
        <h1>Weather Forecast</h1>
        <details>
            <summary>Select City</summary>
            <button @click="selectCity('Rome')">Rome</button>
            <button @click="selectCity('Milan')">Milan</button>
            <button @click="selectCity('Florence')">Florence</button>
            <button @click="selectCity('Venice, IT')">Venice</button>
        </details>

        <div v-if="weatherData">
            <h2>{{ weatherData.name }}'s weather</h2>

            <div class="weather-info">
                <p>{{ weatherData.weather[0].description }}</p>

                <div class="sky-info">
                    <img :src="weatherIconUrl" alt="Weather Icon" />
                    <p class="temperature"><strong>{{ weatherData.main.temp }} °C</strong></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, computed, ref, onMounted } from 'vue';
import { useWeatherStore } from "@/stores/weatherStore";

const emit = defineEmits(['weather-updated']);
const weatherStore = useWeatherStore();

// Stato reattivo per i dati meteorologici
const weatherData = ref(null);

// Metodo per selezionare la città
const selectCity = async (city) => {
    emit('weather-updated', city);

    // Carica i dati meteo dalla store quando una città è selezionata
    const data = await weatherStore.fetchWeather(city);
    if (data) {
        weatherData.value = data;
    }
};

// Computed property per l'URL dell'icona meteo
const weatherIconUrl = computed(() => {
    if (weatherData.value && weatherData.value.weather && weatherData.value.weather[0]) {
        const iconCode = weatherData.value.weather[0].icon;
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
    return '';
});

// Caricamento iniziale (opzionale)
onMounted(() => {
    // Puoi impostare una città predefinita se lo desideri
    selectCity('Rome');
});
</script>

<style scoped> 
@import url('https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

p {
    font-family: "Old Standard TT", serif;
    font-size: 20px;
}

strong {
    font-family: "Livvic", sans-serif;
    font-size: 30px;
    margin-left: 10px;
}

.weather-dashboard {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid black;
}

.weather-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sky-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

p {
    margin: 0;
}

.temperature {
    margin-left: 10px;
}

details {
    font-size: 40px;
}

details summary {
    list-style: none;
    padding: 0;
    cursor: pointer;

    width: 198px;
    border: 1px solid black;
    border-radius: 20px;
    margin: 0 auto;
}

button {
    cursor: pointer;
    width: 70px;
    height: 40px;
    margin: 0 2px;
    border-radius: 10%;
    font-family: "Livvic", serif;
    font-weight: 600;
}
</style>