/**Copy the following JSON into a file users.json:

[
  {"username" : "adam", "password":"123"},
  {"username" : "josh", "password": "asd"},
  {"username" : "cat", "password": "dog"}
]
Create an express server, that receives post reqests to /login. It will check that the request has a username and password properties. It will fetch the list of username-password pairs from users.json and try to match the request to one of these. If a match is found, the server will respond with the string 'You're In!. Otherwise, it will respond with 'Invalid username/password'. */