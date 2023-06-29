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
#  tags       :string
#
class Post < ApplicationRecord
    #validations
    validates :body,presence: true
    validates :title, length: {maximum: 64}
    
    # before_save :purge_photos
    #associations
    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User,
        inverse_of: :posts
    
    has_many :likes,
        dependent: :destroy
    has_many :liked_users,
        through: :likes,
        source: :post
    has_many :comments,
        dependent: :destroy 
    
    has_many :commented_users,
        through: :comments,
        source: :user 
  
    #photo association
    has_one_attached :photo1
    has_one_attached :photo2
    has_one_attached :photo3
    has_one_attached :photo4

    # def purge_photos
    #     if self.photo1.attached? && self.photo1 == 'remove'
    #         self.photo1=nil
    #         self.photo1.purge_later
    #     end
    #     if self.photo2.attached? && self.photo2=='remove'
    #         self.photo2=nil
    #         self.photo2.purge_later
    #     end
    #     if self.photo3.attached? && self.photo3=='remove'
    #         self.photo3=nil
    #         self.photo3.purge_later
    #     end
    #     if self.photo4.attached? && self.photo4=='remove'
    #         self.photo4=nil
    #         self.photo4.purge_later
    #     end
    # end
end
