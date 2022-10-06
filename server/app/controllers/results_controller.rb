class ResultsController < ApplicationController
    
    def index
        @results = Result.all
        if @results == []
            render json: { errors: "no results" } , status:422
        else 
            render json:@results , status: :ok
        end
        
    end  

    def destroy
        result = Result.find_by(id: params[:id])
        if result.destroy
            render json: "Done"
        else 
            render json: { errors: result.errors.messages } , status:422
        end
    end

    def show
        @result = Result.where(id: params[:id]).first
        if @result.present?
            render json:{
                status: :ok,
                data: { result: @result, answers_attributes: @result.answers},
            }
        else
            render json: { error: "no result" } , status:422
        end
    end 

end

