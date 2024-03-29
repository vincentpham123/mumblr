# @post = Post.includes(:likes, :comments).all
json.postsleft do 
    json.posts_left @posts_left
end

json.posts do 
    @posts.shuffle().each do |post|
        json.set! post.id do 
            json.partial! '/api/posts/post_brief',post: post 
        end
    end
end
json.users do 
    author_ids = @posts.map {|post| post.author.id}.uniq
    author_ids.each do |author_id|
        author = User.find(author_id)
        json.set! author.id do 
            json.extract! author, :username, :id
            json.profilepic author.profilepic.attached? ? author.profilepic.url : nil 
            json.background author.background.attached? ? author.background.url : nil
        end
    end

end

json.follows do
    session_user = current_user
    if session_user 
        post_authors = @posts.map{|post| post.author.id}.uniq
        post_follows = session_user.follows.select {|follow| post_authors.include?(follow.user_id)}
        post_follows.each do |follow|
            json.set! follow.id do 
                json.extract! follow, :id, :user_id, :follower_id
            end
        end
    end
end
json.likes do
    session_user = current_user
    if session_user
      post_user_likes = Like.joins(:post).where(posts: { id: @posts.map(&:id) }, user_id: session_user.id)
      post_user_likes.each do |like|
        json.set! like.id do
          json.extract! like, :id, :user_id, :post_id
        end
      end
    end
end
# json.likes do 
#     @posts.each do |post|
#         post.likes.each do |like|
#             json.set! like.id do
#                 json.extract! like, :id, :post_id 
#                 json.liker do
#                     json.extract! like.user, :id, :profilepic, :username 
#                     json.profilepic like.user.profilepic.url
#                 end
#             end
#         end
#     end
# end

# json.comments do
#     @posts.each do |post|
#         post.comments.each do |comment|
#             json.set! comment.id do
#                 json.extract! comment, :id, :body, :post_id,
#                 json.commenter do 
#                     json.extract! comment.user, :id, :username
#                     json.profilepic comment.user.profilepic.url
#                 end

#             end
#         end
#     end
# end
