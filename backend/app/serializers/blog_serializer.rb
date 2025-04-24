class BlogSerializer
  def initialize(blog, include_user = false)
    @blog = blog
    @include_user = include_user
  end

  def as_json
    json = {
      id: @blog.id,
      title: @blog.title,
      content: @blog.content,
      status: @blog.status,
      published_at: @blog.published_at,
      created_at: @blog.created_at,
      updated_at: @blog.updated_at
    }

    json[:user] = UserSerializer.new(@blog.user).as_json if @include_user
    json
  end
end 