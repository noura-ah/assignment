class User < ApplicationRecord
    has_secure_password

    validates :email, presence:true,:uniqueness => true, format:{with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i, message:"must be a vaild email address"}
    validates :name, presence:true
    validates :role, presence:true
end
