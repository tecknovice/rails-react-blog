module Api
  class ProfilesController < ApplicationController
    before_action :authenticate_request

    # GET /api/profile
    def show
      profile = current_user.profile
      
      if profile
        render json: ProfileSerializer.new(profile).as_json
      else
        render json: { error: 'Profile not found' }, status: :not_found
      end
    end

    # PUT /api/profile
    def update
      profile = current_user.profile
      
      if profile&.update(profile_params)
        render json: ProfileSerializer.new(profile).as_json
      else
        render json: { errors: profile&.errors&.full_messages || ['Profile not found'] }, status: :unprocessable_entity
      end
    end

    private

    def profile_params
      # Handle both nested and top-level parameters
      if params[:profile].present?
        params.require(:profile).permit(:bio, :website, :location)
      else
        params.permit(:bio, :website, :location)
      end
    end
  end
end
