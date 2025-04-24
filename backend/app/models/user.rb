class User < ApplicationRecord
  has_secure_password
  has_many :blogs, dependent: :destroy
  has_one :profile, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password_digest, presence: true
  validates :name, presence: true
  validates :role, inclusion: { in: %w[user admin] }

  before_validation :set_default_role

  def set_default_role
    self.role ||= 'user'
  end

  def admin?
    role == 'admin'
  end
end
