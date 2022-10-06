class MobileApiController < ApplicationController
    skip_before_action :require_login, only:[:login]

    # allow students access this controller
    skip_before_action :authorize_admin

    
    # POST  /api/student/login
    def login
        user = User.find_by(email: params[:email])
        
        if user.present? && user.authenticate(params[:password]) && user.role == "student"
            session[:user_id]= user.id
            render json:{
                messages: "Logged in successfully",
                is_success: true,
                status: :ok,
                user_id: user.id ,
            }
        else 
            render json: "Wrong Email or Password" ,status:400
            
        end
    end 

    # DELETE  /api/student/logout
    def logout
        session[:user_id] = nil
        render json: "logged out" , status: :ok
    end

    # GET  /api/student/tests => list of all tests
    def list_tests
        @tests = Test.all
        if @tests == []
            render json: { errors: "no tests available" } , status:422
        else 
            render json:{
                status: :ok,
                tests:  @tests,
            }
        end
        
    end
    
    # GET  /api/student/test/:id  => get a test includeing questions and choices for each question
    def show
        @test = Test.where(id: params[:id]).first
        if @test.present?
            questions = []

            @test.questions.each do |q|
                @answers = Answer.where(question_id: q.id)
                q = q.attributes
                q['answers'] = @answers
                questions.push(q)
            end

            render json:{
                status: :ok,
                data: { test: @test, questions: questions},
            }
        else
            render json: { error: "no test" } , status:422
        end
    end
    
    # POST /api/student/test/:id
    # recevie a json object has an array called answers,   
    # which includes answer_ids that user choose for each question
    #
    #  for example => { "answers":[
    #                             { "answer_id":"3" },
    #                             { "answer_id":"4" },
    #                           ] }
    def create
        score = 0
        # calculate score
        params[:answers].each do |a|
            answer = Answer.find_by(id: a['answer_id'])
            @question = Question.find_by(id: answer.question_id)
            if @question.correct_ans == answer.choice
                score +=1
            end
        end

        @result = Result.new(score: score, test_id: @question.test_id, user_id: current_user.id)

        if @result.save
            render json:@result , status: :created
        else 
            render json: { errors: @result.errors.messages } , status:422
        end
    end 
    

end