
# pull likes and posts 

json.posts do 
    @likes.each do |like|
        json.set! like.post.id do 
            json.partial! '/api/posts/post_brief', post: like.post 
        end
    end
end

# need to return the likes of each user's liked posts
json.likes do 
    @likes.each do |like|
        like.post.likes.each do |like|
            json.set! like.id do
                json.extract! like, :id, :post_id 
                json.liker do 
                    json.extract! like.user, :id, :username
                    json.profilepic like.user.profilepic
                end
            end
        end
    end
end

json.comments do 
    @likes.each do |like|
        like.post.comments.each do |comment|
            json.set! comment.id do
                json.extract! comment, :id, :post_id 
                json.commenter do 
                    json.extract! comment.user, :id, :username
                    json.profilepic comment.user.profilepic
                end
            end
        end
    end
end


