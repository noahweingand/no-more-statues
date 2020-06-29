# Live Site
[nomorestatues.com](nomorestatues.com)

# Description
Single-page application for tracking historical statues and monuments removed (and to-be removed) in response to police brutality.

As you may know, the removal of these statues has grown significant due to George Floyd’s murder inciting a demand for change across the globe. Previously donating to my city’s bail fund (shoutout Richmond, VA) and participating in protests, I wanted to do something more. As statues started to come down fast and all over, I found it rather difficult to find information on them all. I compiled data into a database, created an API to retrieve the data, and a client to interact with it.

# Run locally
Run client
```
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
    - Hosted on AWS S3
- Other hosting
    - AWS ACM, Route53, and Cloudfront to send everything securely to the domain

# Issues during development
1.	One difficulty I encountered as I started to test my API was that DynamoDB’s queries are case sensitive, which made it hard to handle the name searching on the front end. I had to add another attribute in the DB for searching, so right now searching only works in lowercase. In hindsight, I should’ve switched it out for something else, but I figured the document model was best since I knew the data wasn’t going to be too relational or abundant.
2.	Accumulating data took the longest as I had to reference articles for cross streets for low profile statue coordinates. I also entered all entries to the database by hand but am thinking of creating a scraper to automate the process. This helps for entering data like names and date, but still doesn’t fix the coordinates problem.
3.	Time was a priority as I wanted to get this out as soon as possible, so I rushed on the frontend. I think the functionality could be reworked more appropriately and expanded. Overall, the client could be structured better.

# Moving Forward / Help 
If you’re interested in helping, please feel free to reach out or open an issue. I built the whole project, and if it picks up, I will definitely need help scaling the application and expanding the functionality of the API and client. Even if you don’t know much but are interested in helping, don’t hesitate to contact me.