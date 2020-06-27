# no-more-statues
Single-page application for tracking historical statues and monuments removed (and to-be removed) in response to police brutality.

# Data Sources
- [wiki](https://en.wikipedia.org/wiki/List_of_monuments_and_memorials_removed_during_the_George_Floyd_protests#United_States)
- [whentheycamedown](https://whentheycamedown.com/)

# Run locally
Run server
```
git clone https://github.com/noahweingand/no-more-statues.git
cd no-more-statues/backend
npm start
```
Run client
```
cd no-more-statues/frontend
npm start
```

# To do
- Front End
    - minor changes
- general
    - add rest of standing statues, update any that have been tore down
    - is how the search call to api going to be expensive???
- deploy
    - backend - serverless npm package
    - front end - static files to s3 bucket?
