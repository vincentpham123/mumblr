json.extract! @like, :id, :post_id 
json.liker do
    json.extract! @like.user, :user_id, :profile_pic, :username 
end
