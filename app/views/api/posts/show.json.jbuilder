json.posts do 
    json.partial! 'api/posts/post_brief', post: @post 
end


json.likes do
    @post.likes.each do |like|
        json.set! like.id do
            json.extract! like, :id, :post_id
            json.liker do
                json.extract! like.user, :id, :username
                json.profilepic like.user.profilepic.url
            end
        end
    end
end

json.comments do 
    @post.comments.each do |comment|
        json.set! comment.id do
            json.extract! comment, :body, :id, :post_id
            json.commenter do 
                json.extract! comment.user, :id,:username
                json.profilepic comment.user.profilepic.url 
            end
        end
    end
end