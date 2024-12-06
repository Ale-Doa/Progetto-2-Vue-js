<template>
    <div class="daily-kwh-counter">
        <h3>Today's Accumulated Energy</h3>
        <p class="kwh-display">{{ formattedKwh }} kWh</p>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';

export default {
    props: {
        weatherData: Object
    },
    setup(props) {
        // Stato reattivo per i kWh
        const dailyKwh = ref(0);
        const lastUpdatedDate = ref(null);
        let intervalId = null;

        // Metodo per ottenere la data corrente in formato YYYY-MM-DD
        const getCurrentDate = () => {
            return new Date().toISOString().split('T')[0];
        };

        // Metodo per caricare i dati da localStorage
        const loadFromLocalStorage = () => {
            const storedData = localStorage.getItem('solarDashboardData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                const currentDate = getCurrentDate();

                // Controlla se i dati sono di oggi
                if (parsedData.date === currentDate) {
                    dailyKwh.value = parsedData.kwh;
                    lastUpdatedDate.value = parsedData.date;
                }
            }
        };

        // Metodo per salvare i dati in localStorage
        const saveToLocalStorage = () => {
            const currentDate = getCurrentDate();
            localStorage.setItem('solarDashboardData', JSON.stringify({
                kwh: dailyKwh.value,
                date: currentDate
            }));
        };

        // Metodo per incrementare i kWh
        const incrementKwh = () => {
            if (props.weatherData) {
                const currentDate = getCurrentDate();

                // Azzera se è un nuovo giorno
                if (lastUpdatedDate.value !== currentDate) {
                    dailyKwh.value = 0;
                    lastUpdatedDate.value = currentDate;
                }

                const clouds = props.weatherData.clouds.all;
                const temperature = props.weatherData.main.temp;

                let irradiance = 0;
                if (clouds < 50) {
                    irradiance = 1000 - (clouds * 10);
                } else {
                    irradiance = 500 - (clouds * 5);
                }

                if (temperature > 25) {
                    irradiance += 200;
                } else if (temperature < 10) {
                    irradiance -= 100;
                }

                // Calcolo incremento basato sui dati meteo
                const energyIncrement = ((irradiance * 20) / 1000) / 3600; // kWh al secondo
                dailyKwh.value += energyIncrement;

                // Salva in localStorage
                saveToLocalStorage();
            }
        };

        // Computed per formattare i kWh con 2 decimali
        const formattedKwh = computed(() => dailyKwh.value.toFixed(7));

        onMounted(() => {
            // Carica i dati salvati
            loadFromLocalStorage();

            // Avvia l'intervallo per incrementare i kWh
            intervalId = setInterval(incrementKwh, 1000);
        });

        onUnmounted(() => {
            // Pulisci l'intervallo quando il componente viene smontato
            if (intervalId) {
                clearInterval(intervalId);
            }
        });

        return {
            dailyKwh,
            formattedKwh
        };
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

.daily-kwh-counter {
    text-align: center;
    border-top: 1px solid black;
    font-family: "Old Standard TT", serif;
    font-size: 18px;
}

.kwh-display {
    font-size: 2em;
    font-weight: bold;
    font-family: "Livvic", sans-serif;
}

@media screen and (max-width: 450px) {
    .daily-kwh-counter {
        width: 100vw;
    }
}
</style>