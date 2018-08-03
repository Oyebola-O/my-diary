[![Build Status](https://travis-ci.org/Oyebola-O/my-diary.svg?branch=develop)](https://travis-ci.org/Oyebola-O/my-diary)
[![Coverage Status](https://coveralls.io/repos/github/Oyebola-O/my-diary/badge.svg?branch=develop)](https://coveralls.io/github/Oyebola-O/my-diary?branch=develop)

# My Diary
MyDiary is an online journal where users can pen down their thoughts and feelings. It gives users a place where they can create, store and edit and document their stories, thoughts and feelings.

## Getting Started
There are 2 ways to interact with this app. 

Either from the GUI on github pages :
* https://oyebola-o.github.io/my-diary/UI/views/index.html
* https://oyebola-o.github.io/my-diary/UI/views/diary.html

or from the api on heroku : https://my-diary-v1-demo.herokuapp.com/


## Application Featusers
* New users can sign up
* Old users can login
* Users can create entries
* Users can fetch entries
* Users can edit entries


## How to use Api
Currently these are the available endpoints: https://my-diary-v1-demo.herokuapp.com/
To use api, go to
and append any of the available paths to the end of the url. You would however need to create an account and login to use these. It would be most convenient to use postman with this api.

**Sign up** 

`/auth/signup`

**Login** 

`/auth/login`

**Fetch all entries (GET) ** 

`/entries`


**Fetch a single entry using id (GET) ** 

```/entries/:id```


**Create an entry (POST) ** 

```/entries```


**Modify an entry (PUT) ** 

```/entries/:id```

## Built With
* Node.js - Open source server environment
* Express - A node framework
* Postgresql - A query language
* HTML and CSS


## Authors
HOBO 

Oyebola Odukoya 

oyebolaodukoya@gmail.com
