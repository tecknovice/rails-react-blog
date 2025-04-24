class ProfileSerializer
  def initialize(profile)
    @profile = profile
  end

  def as_json
    {
      id: @profile.id,
      user_id: @profile.user_id,
      bio: @profile.bio,
      website: @profile.website,
      location: @profile.location,
      created_at: @profile.created_at,
      updated_at: @profile.updated_at
    }
  end
end 