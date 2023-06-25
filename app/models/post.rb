# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  title      :string
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    #validations
    validates :body,presence: true
    validates :title, length: {maximum: 64};

    #associations
    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User,
        inverse_of: :posts
    
    has_many :likes,
        dependent: :destroy
    
    #photo association
    has_one_attached :photo1
    has_one_attached :photo2
    has_one_attached :photo3
    has_one_attached :photo4
end
