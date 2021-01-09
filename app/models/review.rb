class Review < ApplicationRecord
  default_scope { order(created_at: :desc) }
  
  belongs_to :restaurant
  belongs_to :user

  # TODO: add more validations?
  validates :title, presence: true
end
