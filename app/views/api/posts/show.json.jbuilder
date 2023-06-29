json.partial! 'api/posts/post_brief', post: @post 


json.likes do
    @post.likes.each do |like|
        json.set! like.id do
            json.extract! like, :id, :post_id
            json.liker do
                json.extract! like.user, :id, :username,:profilepic.url
            end
        end
    end
end