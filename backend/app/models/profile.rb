class Profile < ApplicationRecord
  belongs_to :user

  validates :user_id, uniqueness: true
  
  # URL validation with a simple regex for website
  validates :website, format: { with: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?\z/, allow_blank: true }
end
