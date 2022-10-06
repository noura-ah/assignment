class UsersController < ApplicationController
    skip_before_action :require_login #, only:[:create, :index]
    skip_before_action :authorize_admin

    # GET /api/users  => get all users
    def index
        @users = User.all
        if @users == []
            render json: { errors: "no user" },  status:422
        else 
            
            render json:{
                users: @users , 
                status: :ok ,
                session: session[:user_id]
        }
        end
    end  

    # POST /api/users  => create new user
    def create
        @user = User.new(email: params[:email], password: params[:password], password_confirmation:
        params[:password_confirmation], name: params[:name], role: params[:role])

        if @user.save
            render json:@user , status: :created
        else 
            render json: { errors: @user.errors.messages } , status:422
        end
    end 

    # PUT /api/users/:id
    def update
        user = User.find_by(id: params[:id])
        if user.update(user_params)
            render json:user , status: :created
        else 
            render json: { errors: user.errors.messages } , status:422
        end
    end 

    # DELETE /api/users/:id
    def destroy
        user = User.find_by(id: params[:id])
        if user.destroy
            head :no_content
        else 
            render json: { errors: user.errors.messages } , status:422
        end
    end

    # GET /api/users/:id  => show user info
    def show
        @user = User.where(id: params[:id]).first
        if @user.present?
            render json:@user , status: :ok
        else
            render json: { error: "no user" } , status:422
        end
    end 

    private

    def user_params
        params.require(:user).permit(:email,:name,:role,:password,:password_confirmation)
    end
    
end
