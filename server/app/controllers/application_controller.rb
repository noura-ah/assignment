class ApplicationController < ActionController::API
    include ActionController::Helpers
    include ActionController::Cookies


    def logged_in?
        session[:user_id] 
    end    

    def require_login
        if !logged_in?
            render json: "need to login first", status:401
        end
    end

    def current_user
        @current_user ||= User.find(session[:user_id]) if  
        session[:user_id]
    end

    # dont allow students to access routes unless skip_before_action is used
    def authorize_admin
        if current_user.role == 'student'
            return render json: { errors: "Forbidden" }, status:403
        end
    end

    helper_method :current_user
    helper_method :logged_in? 
    before_action :require_login
    before_action :authorize_admin


end
