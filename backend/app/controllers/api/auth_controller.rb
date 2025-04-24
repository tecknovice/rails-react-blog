module Api
  class AuthController < ApplicationController
    before_action :authenticate_request, only: [:me]

    # POST /api/auth/register
    def register
      user = User.new(user_params)
      
      if user.save
        # Create a profile for the user
        user.create_profile
        
        token = JsonWebToken.encode(user_id: user.id)
        render json: { user: UserSerializer.new(user).as_json, token: token }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # POST /api/auth/login
    def login
      user = User.find_by(email: params[:email])
      
      if user&.authenticate(params[:password])
        token = JsonWebToken.encode(user_id: user.id)
        render json: { user: UserSerializer.new(user).as_json, token: token }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end

    # GET /api/auth/me
    def me
      render json: { user: UserSerializer.new(current_user).as_json }, status: :ok
    end

    private

    def user_params
      params.permit(:name, :email, :password)
    end
  end
end
