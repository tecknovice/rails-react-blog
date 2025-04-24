module Admin
  class UsersController < ApplicationController
    before_action :authenticate_request
    before_action :authorize_admin
    before_action :set_user, only: [:show, :update, :destroy]

    # GET /admin/users
    def index
      users = User.all
      render json: users.map { |user| UserSerializer.new(user).as_json }
    end

    # GET /admin/users/:id
    def show
      render json: UserSerializer.new(@user).as_json
    end

    # PUT /admin/users/:id
    def update
      if @user.update(user_params)
        render json: UserSerializer.new(@user).as_json
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /admin/users/:id
    def destroy
      @user.destroy
      render json: { message: 'User successfully deleted' }
    end

    private

    def set_user
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'User not found' }, status: :not_found
    end

    def user_params
      params.permit(:name, :email, :role, :avatar_url)
    end
  end
end
