# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  user_id    :bigint           not null
#  post_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
    
    validates :body, :user_id, :post_id, presence: true 
    validates :body, length: {maximum: 399}

    
    belongs_to :user

    belongs_to :post 

end
