# sunlight-service-api

Sunlight Service API is a Node/Express backend project developed using TypeScript. This API has two endpoints that return the total number of daylight hours for a given date and geographic location.

## Installation

To run Sunlight Service API in your local environment, please first make sure you have Docker and Docker-Compose installed. Then do the following steps:

  1. Clone this repository to your local environment.
  2. Copy the content of the `.env.sample` file to a new `.env` file in the same folder. This new file will contain your environment variables.
  3. Run the command `docker-compose up` to start the server. By default, the server will run on port 5000.

## Endpoints

This API has two endpoints:
### GET /sunlight

This endpoint returns the total number of daylight hours for a specific date and geographic location.

Query Parameters

    lat: latitude of the location you want to check. Required.
    lng: longitude of the location you want to check. Required.
    date: date in the format YYYY-MM-DD you want to check. Required.

Response

The response has the following format:

    {
      "date": "2022-06-14",
      "coordinates": {
          "latitude": 45.4654,
          "longitude": 9.1859
      },
      "total_hours_of_light": "15:33:21" 
    }

### GET /sunlight-one-year

This endpoint returns the total number of daylight hours for a specific date and geographic location, for each month until the end of the year.

Query Parameters

    lat: latitude of the location you want to check. Required.
    lng: longitude of the location you want to check. Required.
    date: date in the format YYYY-MM-DD you want to check. Required.

Response

The response is an array of objects, each with the same format as the response of the /sunlight endpoint. The array contains one object for each month between the chosen date and the end of the year.

## Deployment

Sunlight Service API is ready to be deployed on GCP Cloud Run. A GitHub Action has been prepared to automate the deployment process. To deploy the API, simply push your changes to the repository's master branch.

## Front-end
The front-end part of this project is located in the repository https://github.com/antoniocapizzi95/sunlight-service-ui
