# Solar Dashboard

## Panoramica del progetto

Il Solar Dashboard è un'applicazione web innovativa progettata per monitorare e visualizzare in tempo reale la produzione di energia solare. Questo strumento offre agli utenti un'interfaccia intuitiva per comprendere la generazione di energia fotovoltaica in base alle condizioni meteorologiche attuali.

## Funzionalità principali

- Selezione Città: Monitoraggio energetico per diverse città italiane.
- Dati Meteorologici in Tempo Reale: Integrazione con OpenWeatherMap API.
- Calcolo Energetico Dinamico: Stime precise basate su nuvolosità, temperatura e irraggiamento.
- Contatore Giornaliero: Accumulo e persistenza dell'energia prodotta.
- Dashboard Interattiva: Visualizzazione di produzione istantanea, energia giornaliera e mensile.

## Tecnologie utilizzate

- Vue.js 3
- Pinia (Gestione dello Stato)
- OpenWeatherMap API
- LocalStorage per persistenza dei dati

## Prerequisiti

- Node.js (versione 14.0.0 o superiore)
- npm (Node Package Manager)

## Installazione

1. Clona repository:
```
git clone https://github.com/[your-username]/solar-dashboard.git
```
2. Installa le dipendenze:
```
cd solar-dashboard
npm install
```
3. Aggiungi la tua API key di Open Weather Map
4. Avvia il progetto in modalità sviluppo:
```
npm run dev
```

## Configurazione API

Per utilizzare l'API di OpenWeatherMap, è necessario:

1. Registrarsi su OpenWeatherMap
2. Generare una chiave API gratuita
3. Inserire la chiave nel file di configurazione

## Struttura del progetto

```
solar-dashboard/
│
├── src/
│   ├── components/
│   │   ├── WeatherDashboard.vue
│   │   ├── PowerProduction.vue
│   │   └── ...
│   │
│   ├── stores/
│   │   └── weatherStore.js
│   │
│   └── views/
│       └── HomeView.vue
│
├── public/
└── README.md
```

## Link al sito web:

[Solar Dashboard](https://hotel-pomelia-solar-dashboard.netlify.app/)