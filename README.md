[![Build Status](https://travis-ci.org/Oyebola-O/my-diary.svg?branch=api_v1)](https://travis-ci.org/Oyebola-O/my-diary)
![Coveralls github](https://img.shields.io/coveralls/github/jekyll/jekyll.svg)

# My Diary
MyDiary is an online journal where users can pen down their thoughts and feelings.

## Getting Started
This is v1 of my diary api. You do not need to install anything to use it.
All you need is a browser where you can send http requests through.


## How to use
Currently these are the available endpoints: https://my-diary-v1-demo.herokuapp.com/
To use api, go to
and append any of the available paths to the end of the url

###Fetch all entries, GET /entries
/api/v1/entries


###Fetch a single entry, GET /entries/:entryId
/api/v1/entries/:id


###Create an entry, POST /entries
/api/v1/entries


###Modify an entry, PUT /e​ntries​/e​ntryId​
/api/v1/entries/:id

## Built With
This program was build using:
Node.js - Open source server environment
Express - A node framework


## Versioning
The apps api's are versioned using a v followed by an ordinary number
e.g:
api/v1

## Authors
HOBO
Oyebola Odukoya
