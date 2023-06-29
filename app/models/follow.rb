# == Schema Information
#
# Table name: follows
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  follower_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Follow < ApplicationRecord
    validates :follower_id, :user_id, presence: true 
    validates :follower_id. uniqueness: {scope: :user_id}

    belongs_to :follower,
        class_name: :User,
        foreign_key: :follower_id

    belongs_to :user
    
end
