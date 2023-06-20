
@posts.each do |post|
    json.set! post.id do 
        json.partial! '/api/posts/post_brief',post: post 
    end
end