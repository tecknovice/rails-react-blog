module Api
  class BlogsController < ApplicationController
    before_action :authenticate_request, except: [:index, :show]
    before_action :set_blog, only: [:show, :update, :destroy]
    before_action :authorize_blog, only: [:update, :destroy]

    # GET /api/blogs
    def index
      # Eager load the user association to avoid N+1 queries
      blogs = Blog.includes(:user).where(status: 'published').order(published_at: :desc)
      render json: blogs.map { |blog| BlogSerializer.new(blog, true).as_json }
    end

    # GET /api/blogs/:id
    def show
      if @blog.published? || (@current_user && (@blog.user_id == @current_user.id || @current_user.admin?))
        render json: BlogSerializer.new(@blog, true).as_json
      else
        render json: { error: 'Blog not found or not published' }, status: :not_found
      end
    end

    # POST /api/blogs
    def create
      blog = current_user.blogs.new(blog_params)
      
      if blog.save
        # Set published_at if status is 'published'
        blog.update(published_at: Time.current) if blog.status == 'published'
        
        render json: BlogSerializer.new(blog).as_json, status: :created
      else
        render json: { errors: blog.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PUT /api/blogs/:id
    def update
      if @blog.update(blog_params)
        # Update published_at if status changed to 'published'
        if blog_params[:status] == 'published' && @blog.status_previously_changed?
          @blog.update(published_at: Time.current)
        end
        
        render json: BlogSerializer.new(@blog).as_json
      else
        render json: { errors: @blog.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /api/blogs/:id
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

    def authorize_blog
      unless @current_user && (@blog.user_id == @current_user.id || @current_user.admin?)
        render json: { error: 'Not authorized to perform this action' }, status: :forbidden
      end
    end

    def blog_params
      params.permit(:title, :content, :status)
    end
  end
end
