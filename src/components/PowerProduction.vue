<template>
    <div class="power-production">
        <p>Power Production:</p>
        <p class="energy">{{ powerProduction }} kW</p>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        weatherData: Object
    },
    setup(props) {
        // Calcoliamo la produzione energetica basata sui dati meteo
        const powerProduction = computed(() => {
            if (props.weatherData) {
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

                return ((irradiance * 20) / 1000).toFixed(2); // In kW (20 m² of solar panels)
            }
            return 0;
        });

        return {
            powerProduction
        };
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

p {
    font-family: "Old Standard TT", serif;
    font-size: 20px;
}

.energy {
    font-size: 30px;
    font-family: "Livvic", sans-serif;
}
</style>