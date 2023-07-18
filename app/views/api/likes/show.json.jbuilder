
json.extract! @like, :id, :post_id 
json.liker do
    json.extract! @like.user, :id, :username
     json.profilepic @like.user.profilepic.url
end
