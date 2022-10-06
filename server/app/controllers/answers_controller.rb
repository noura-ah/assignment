class AnswersController < ApplicationController
    skip_before_action :require_login
    skip_before_action :authorize_admin

    def index
        @answers = Answer.all
        if @answers == []
            render json: { errors: "no answers" } , status:422
        else 
            render json:@answers , status: :ok
        end
        
    end  

    def create
        
        @answer = Answer.new(answer_params)

        if @answer.save
            render json:@answer , status: :created
        else 
            render json: { errors: @answer.errors.messages } , status:422
        end
    end 

    def update
        answer = Answer.find_by(id: params[:id])
        if answer.update(answer_params)
            render json:answer , status: :created
        else 
            render json: { errors: answer.errors.messages } , status:422
        end
    end 

    def destroy
        answer = Answer.find_by(id: params[:id])
        if answer.destroy
            head :no_content
        else 
            render json: { errors: answer.errors.messages } , status:422
        end
    end

    def show
        @answer = Answer.where(id: params[:id]).first
        if @answer.present?
            render json:@answer , status: :ok
        else
            render json: { error: "no answer" } , status:422
        end
    end 

    private

    def answer_params
        params.require(:answer).permit(:label,:description)
    end
    
end

