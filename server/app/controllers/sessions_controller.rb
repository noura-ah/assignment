class SessionsController < ApplicationController
    skip_before_action :require_login, only:[:create]
    skip_before_action :authorize_admin, only:[:create]

    def create
        user = User.find_by(email: params[:email])
        
        if user.present? && user.authenticate(params[:password]) && user.role == "teacher"
            session[:user_id]= user.id
            render json:session[:user_id] , status: :ok
        elsif user.present? && user.authenticate(params[:password]) && user.role == 'student'
            render status:403
        else 
            render status:400
        end
    end 

    def destroy
        session[:user_id] = nil
        render json: "logged out" , status: :ok
    end
end