## Person Record
- Utilizes React, Webpack, TypeScript
- Material-UI for CSS components (mainly the table)

## Problem Solving
Databases can be divided into two categories, SQL (relational) and NoSQL (non-relational). Given the 100GB restriction, leaning towards horizontal scalability rather than vertical scalability might be more important when deciding which database to implement. Although we are trying to provide data for a table, we are only trying to provide data for one column of the table, the date-time column. With these two factors in consideration, going with a NoSQL database seems like the better option. NoSQL databases are better at horizontal scalability and does not use a predefined schema. Among the NoSQL databases, Apache Cassandra appears to be the one best suited for providing real-time data, at least in respect to logging time-based activities which is what most date-time columns are used for.
