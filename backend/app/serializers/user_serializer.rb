class UserSerializer
  def initialize(user)
    @user = user
  end

  def as_json
    {
      id: @user.id,
      email: @user.email,
      name: @user.name,
      role: @user.role,
      avatar_url: @user.avatar_url,
      created_at: @user.created_at,
      updated_at: @user.updated_at
    }
  end
end 