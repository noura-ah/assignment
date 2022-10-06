Rails.application.routes.draw do
  
  scope :api, defaults: { format: :json } do
    # --------------------------- admin (teacher) api ----------------

    # CRUD oprations for each
    # example of route => GET /api/users, return all users in the db, 
    #                     GET /api/tests/:id, return one test that match the id
    resources :users
    resources :tests
    resources :questions
    resources :answers
    resources :results

    # admin login
    post "sign_in", to:"sessions#create"

    # admin logout
    delete "logout", to:"sessions#destroy"


    # ---------------------------- mobile api ----------------------------

    # login/logout
    post "student/login", to:"mobile_api#login"
    delete "student/logout", to:"mobile_api#logout"

    # list of all tests
    get "student/tests", to:"mobile_api#list_tests"

    # get a test includeing questions and choices for each question
    get "student/test/:id", to:"mobile_api#show"

    # post result of a test 
    # recevie a json object has an array called answers,   
    # which includes answer_ids that user choose for each question
    #
    #  for example => { "answers":[
    #                             { "answer_id":"3" },
    #                             { "answer_id":"4" },
    #                           ] }
    post "student/test/:id", to:"mobile_api#create"

  end

end
