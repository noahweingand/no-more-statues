# Live Site
[nomorestatues.com](https://nomorestatues.com)

# Statue Data API
Live at [api.nomorestatues.com/v1/statues](https://api.nomorestatues.com/v1/statues)

# Description
Single-page application for tracking historical statues and monuments removed (and to-be removed) in response to police brutality.

As you may know, the removal of these statues has grown significant due to George Floyd’s murder inciting a demand for change across the globe. Previously donating to my city’s bail fund (shoutout Richmond, VA) and participating in protests, I wanted to do something more. As statues started to come down fast and all over, I found it rather difficult to find information on them all. I compiled data into a database, created an API to retrieve the data, and a client to interact with it.

# Interacting with API
- GET
    - '/' -> hello page, references this documentation
    - '/all' -> returns data on all statues
        - Example: [api.nomorestatues.com/v1/statues/all](https://api.nomorestatues.com/v1/statues/all)
    - '/name' -> returns data on statues based off a lowercase search
        - query -> name: name
        - Example: [api.nomorestatues.com/v1/statues/name?name=chris](https://api.nomorestatues.com/v1/statues/name?name=chris) (returns all statues with the name 'Chris')
    - '/date' -> returns data on statues based off a 'yyyy-mm-dd' search
        - query -> date: date
        - Example: [api.nomorestatues.com/v1/statues/date?date=2020-06-13](https://api.nomorestatues.com/v1/statues/date?date=2020-06-13) (returns all statues removed on June 13th, 2020)
    - '/standing' -> returns all standing (or removed) statues based off the query
        - query -> not: false
        - Example: [api.nomorestatues.com/v1/statues/standing?not=false](https://api.nomorestatues.com/v1/statues/standing?not=false) (returns all standing statues)

# Run client locally
```
git clone https://github.com/noahweingand/no-more-statues.git
cd no-more-statues/frontend
npm start
```

# Data Sources
- [wiki](https://en.wikipedia.org/wiki/List_of_monuments_and_memorials_removed_during_the_George_Floyd_protests#United_States)
- [whentheycamedown](https://whentheycamedown.com/)

# Technology Stack
- Datebase
    - DynamoDB
- Backend (API)
    - Express Server
    - Hosted on AWS Elastic Beanstalk
- Frontend 
    - React app
        - Map: react-leaflet
    - Hosted on AWS S3
- Other hosting
    - AWS ACM, Route53, and Cloudfront to send everything securely to the domain

# Issues during development
1.	One difficulty I encountered as I started to test my API was that DynamoDB’s queries are case sensitive. I had to add another attribute in the DB for searching (in lowercase). In hindsight, I should’ve switched it out for something else, but I figured the document model was best since I knew the data wasn’t going to be too relational or abundant and didn't encounter this until API testing when I had entered all the data.
2.	Accumulating data took the longest as I had to reference articles for cross streets for low profile statue coordinates. I also entered all entries to the database by hand but am thinking of creating a scraper to automate the process. This helps for entering data like names and date, but still doesn’t fix the coordinates problem.
3.	Time was a priority as I wanted to get this out as soon as possible, so I rushed on the frontend. I think the functionality could be reworked more appropriately and expanded. Overall, the client could be structured better.

# Moving Forward / Help 
If you’re interested in helping, please feel free to reach out or open an issue. I built the whole project, and if it picks up, I will definitely need help scaling the application and expanding the functionality of the API and client. Even if you don’t know much but are interested in helping, don’t hesitate to contact me.
