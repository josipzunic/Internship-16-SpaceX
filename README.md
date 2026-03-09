# Internship-16-SpaceX

Internship-16-SpaceX is a multipage react JS application that allows users to peek into various Space X missions. Data used in the making of the application was sourced from SpaceX-API.

## Features

- Browse through SpaceX launch missions and recovery ships
- Search missions and ships by name using the built in search bar
- Filter missions based on success or failure
- Infinite scroll on the ships page
- Click on a mission or ship to see additional details including rocket name, failure reasons, and YouTube stream link
- Countdown timer to the next upcoming launch
- Choose from two color themes with preference saved across sessions


## Tech Stack
- React 18
- TypeScript
- React Router v6
- CSS Modules
- SpaceX REST API (v4/v5)


## Usage

1. Clone or download the repository from GitHub
2. Inside a terminal (recommend using VS code and opening terminal using CTRL+J or Cmd+J on MacOS) run the following command to install all the dependencies
```
npm install
```
3. Start the server using 
```
npm run dev
```
4. Copy the url from the terminal into browser url search tab

## API Reference
Data is fetched from the unofficial SpaceX API:
- Launches: `https://api.spacexdata.com/v5/launches`
- Ships: `https://api.spacexdata.com/v4/ships`
- Rockets: `https://api.spacexdata.com/v4/rockets`