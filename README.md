# Modest-Ninja
PDA for ASE

## Setup
1.  Install dependencies using `npm i`

2.  Install the ESLint extension for your Editor  
    VS-Code: ESLint by Dirk Baeumer  

3.  Create a file named `.env` and insert the following:  
    ```conf
    # App settings
    PORT=3000

    # Telegram bot settings
    BOT_TOKEN=<TELEGRAM-BOT-TOKEN>

    # Dashboard password
    DASHBOARD_PASSWORD=$2a$10$KqDExovM4hv8cAtuxWkzSOWko6RIG.uRbS2g9hPH9UqYOxNDWsV/6
    
    # Dashboard password
    UNSPLASH_TOKEN=<UNSPLASH-ACCESS-TOKEN>
    ```

4.  Run the application using one of the following scripts  
    `npm start`: Compiles and starts the PDA  
    `npm run dev`: Same as start but also re-compiles on changes


## Folder Structure

We use a common folder structure for all use cases and API connectors. Files are named in `lowerCamelCase`.

```
src/
├──pda.ts
├──preferences.ts
├──usecases/
│  ├──dailystatus/
│  │  ├──dailystatus.ts
│  │  └──otherFile.ts
│  └──imageoftheday/
│     ├──imageoftheday.ts
│     └──otherFile.ts
├──connectors/
│  ├──reddit.ts
│  ├──googleCalendar.ts
│  └──googleMaps.ts
└──interfaces/
   └──gatewayInterface.ts
```
