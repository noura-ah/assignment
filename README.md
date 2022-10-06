# assignment
This assignment includes server side for mobile api (for students) and admin portal api (for teacher), and a client side for admin portal as well.
### Few notes:
- The app was created within 3 days as requested.
- Ruby on Rails was used in backend.
- React.js was used in frontend.
- Sqlite was used as database, ORM was used to manage it.
- API was tested using postman and while connecting it with react.


## Run the app

#### 1. clone
```
$ git clone https://github.com/noura-ah/assignment.git
```


#### 2. run server
```
$ cd assignment/server
$ bundle install
$ yarn install
$ rails db:migrate
$ rails s
```

#### 3. run client
```
$ cd ../client
$ npm install
$ npm start
```


## Mobile API

#### 1. login/logout
POST  `/api/student/login`

DELETE  `/api/student/logout`


#### 2. list of all tests
GET  `/api/student/tests`


#### 3. get a test including questions and choices for each question
GET  `/api/student/test/:id`


#### 4. recevie a json object has an array called answers, which includes answer_ids that user choose for each question like the example below:
```
{ "answers":[
              { "answer_id":"3" },
              { "answer_id":"4" },
            ] 
}
```

POST `/api/student/test/:id`


## Problems
I was asked to inform about problems I encountered during the project. First of all, this is my first time working with ruby on rails so it took sometime to get used to it.

The relations between test, question and answer were confusing when trying to create a test that includes questions and answers at once, I found a method called `accepts_nested_attributes_for` which help me to solve the problem. 

Also during update test, I had to use a lot of loops to get everything from questions to answers updated properly, I tried to explain it in details in the comments.

Authentication was another problem, it works fine while using postman. Teacher is the only one who can login to access users and tests routes, and student can only login through mobile API. However, when connecting server to client, I couldn't manage to keep teacher logged in. So I added these methods `skip_before_action :require_login` `skip_before_action :authorize_admin` to skip login and authorization while using react, I know its wrong but I just tried to make frontend work to test it.
