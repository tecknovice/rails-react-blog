# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clean up the database first
User.destroy_all
Profile.destroy_all
Blog.destroy_all

# Create admin user
admin = User.create!(
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'password',
  role: 'admin'
)

admin.create_profile(
  bio: 'Administrator of the blog platform.',
  website: 'https://example.com',
  location: 'San Francisco, CA'
)

# Create regular user
user = User.create!(
  name: 'Regular User',
  email: 'user@example.com',
  password: 'password',
  role: 'user'
)

user.create_profile(
  bio: 'Just a regular blog enthusiast.',
  website: 'https://myblog.com',
  location: 'New York, NY'
)

# Create blogs for admin
5.times do |i|
  admin.blogs.create!(
    title: "Admin Blog #{i + 1}",
    content: "This is the content of admin blog #{i + 1}. It contains some interesting information about various topics.\n\nHere's a second paragraph with more details.",
    status: i < 3 ? 'published' : 'draft',
    published_at: i < 3 ? Time.current : nil
  )
end

# Create blogs for regular user
5.times do |i|
  user.blogs.create!(
    title: "User Blog #{i + 1}",
    content: "This is the content of user blog #{i + 1}. It contains some interesting information about various topics.\n\nHere's a second paragraph with more details.",
    status: i < 3 ? 'published' : 'draft',
    published_at: i < 3 ? Time.current : nil
  )
end

puts "Seed data created successfully!"
puts "Admin user: admin@example.com / password"
puts "Regular user: user@example.com / password"
