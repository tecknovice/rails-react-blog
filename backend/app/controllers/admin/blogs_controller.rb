module Admin
  class BlogsController < ApplicationController
    before_action :authenticate_request
    before_action :authorize_admin
    before_action :set_blog, only: [:update, :destroy]

    # GET /admin/blogs
    def index
      # Eager load the user association to avoid N+1 queries
      blogs = Blog.includes(:user).order(created_at: :desc)
      render json: blogs.map { |blog| BlogSerializer.new(blog, true).as_json }
    end

    # PUT /admin/blogs/:id
    def update
      if @blog.update(blog_params)
        # Update published_at if status changed to 'published'
        if blog_params[:status] == 'published' && @blog.status_previously_changed?
          @blog.update(published_at: Time.current)
        end
        
        render json: BlogSerializer.new(@blog, true).as_json
      else
        render json: { errors: @blog.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /admin/blogs/:id
    def destroy
      @blog.destroy
      render json: { message: 'Blog successfully deleted' }
    end

    private

    def set_blog
      @blog = Blog.includes(:user).find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Blog not found' }, status: :not_found
    end

    def blog_params
      params.permit(:status)
    end
  end
end
