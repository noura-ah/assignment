class QuestionsController < ApplicationController
    skip_before_action :require_login
    skip_before_action :authorize_admin
    
    def index
        @questions = Question.all
        if @questions == []
            render json: { errors: "no questions" } , status:422
        else 
            render json:@questions , status: :ok
        end
        
    end  

    def create
        
        @question = Question.new(question_params)

        if @question.save
            render json:@question , status: :created
        else 
            render json: { errors: @question.errors.messages } , status:422
        end
    end 

    def update
        question = Question.find_by(id: params[:id])
        if question.update(question_params)
            render json:question , status: :created
        else 
            render json: { errors: question.errors.messages } , status:422
        end
    end 

    def destroy
        question = Question.find_by(id: params[:id])
        if question.destroy
            render json: "Done"
        else 
            render json: { errors: question.errors.messages } , status:422
        end
    end

    def show
        @question = Question.where(id: params[:id]).first
        if @question.present?
            render json:{
                status: :ok,
                data: { question: @question, answers_attributes: @question.answers},
            }
        else
            render json: { error: "no question" } , status:422
        end
    end 

    private

    def question_params
        params.require(:question).permit(:label,:description)
    end
    
end

