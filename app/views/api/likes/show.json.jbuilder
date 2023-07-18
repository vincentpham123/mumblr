json.like do 
  
        json.extract! @like, :id, :post_id, :user_id
        json.liker do
            json.extract! @like.user, :id, :username
            json.profilepic @like.user.profilepic.url
        end
    
end

json.post do 
    
    json.partial! '/api/posts/post_brief', post: @like.post
end

