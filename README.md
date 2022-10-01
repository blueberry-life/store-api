# store-api

store rest api with node.js express backend with mongodb docker container as database<br>
create-db file connects to mongodb server and create mock data base on products.json<br>

you can do all crud operations in this api<br>

<hr>
REST API Routes:<br>
localhost:port/api/v1/products<br>
localhost:port/api/v1/products/:id<br>

queries you can do in this api:<br>
?sort:by default sorted by created date<br>
numericFilter options:<br>
price:product price<br>
rating:product rating<br>
user operators:<br>
<,>,=,<=,>=<br>
