class TestsController < ApplicationController
    skip_before_action :require_login
    skip_before_action :authorize_admin


    def index
        @tests = Test.all
        if @tests == []
            render json: { errors: "no tests" } , status:422
        else 
            render json:{
                status: :ok,
                tests:  @tests,
            }
        end
        
    end  

    def create
        
        @test = Test.new(test_params)

        if @test.save
            render json:{
                messages: "test was successfully created.",
                is_success: true,
                status: :created,
                data: { tests: @test, questions: @test.questions },
            }
        else 
            render json: { errors: @test.errors.messages } , status:422
        end
    end 

    # PUT /api/users/:id => update test including all Qs and As
    def update
        @test = Test.find(params[:id])
        
        if @test.update(name: params[:name],description: params[:description])
            

            # delete questions that were deleted by admin from db
            @questions = Question.where(test_id: @test.id)
            @questions.each do |q_db|
                flag = true
                params[:questions_attributes].each do |q|
                    if q["id"] == q_db.id
                        flag= false
                        break
                    end
                end
                if  flag
                    Question.find_by(id: q_db['id']).destroy
                end
            end

            #loop over questions to update each one indvidually
            params[:questions_attributes].each do |q|
                # if question is newlly added, create it in the db
                if q['id'] == nil
                    @question = Question.create(label: q['label'],description: q['description'],correct_ans: q['correct_ans'], test_id: @test.id)
                else 
                # update if exist
                    @question = Question.find_by(id: q['id'])
                    @question.update(label: q['label'],description: q['description'],correct_ans: q['correct_ans'])
                end

                # delete answers that were deleted by admin from db
                @answers = Answer.where(question_id: q['id'])
                @answers.each do |a_db|
                    flag = true
                    q["answers_attributes"].each do |a|
                        if a["id"] == a_db.id
                            flag= false
                            break
                        end
                    end
                    if  flag
                        Answer.find_by(id: a_db['id']).destroy
                    end
                end

                #loop over answers for each question to update each one indvidually
                q["answers_attributes"].each do |a|                    
                    # if answer is newlly added, create it in the db
                    if a['id'] == nil
                        Answer.create(choice: a['choice'], question_id: @question.id)
                    else 
                    #update
                        @answer = Answer.find_by(id: a['id'])
                        @answer.update(choice: a['choice'])
                    end
                end
            end
            render json: @test , status: :created
        else 
            render json: { errors: @test.errors.messages } , status:422
        end
    end 

    def destroy
        @test = Test.find_by(id: params[:id])
        
        if @test.destroy
            render json: "Done" 
        else 
            puts @test.errors.inspect
            render json: { errors: @test.errors.messages } , status:422
        end
    end

    # get a test includeing questions and choices for each question
    def show
        @test = Test.where(id: params[:id]).first
        if @test.present?
            questions = []

            @test.questions.each do |q|
                @answers = Answer.where(question_id: q.id)
                q = q.attributes
                q['answers_attributes'] = @answers
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

    private

    def test_params
        params.require(:test).permit(:name,:description, questions_attributes: [ :label, :description, :correct_ans, answers_attributes: [ :choice ] ])
    end
    
end
