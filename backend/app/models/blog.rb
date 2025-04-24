class Blog < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :content, presence: true
  validates :status, inclusion: { in: %w[draft published] }
  
  before_validation :set_default_status

  def set_default_status
    self.status ||= 'draft'
  end

  def published?
    status == 'published'
  end

  def publish!
    update(status: 'published', published_at: Time.current)
  end

  def unpublish!
    update(status: 'draft', published_at: nil)
  end
end
