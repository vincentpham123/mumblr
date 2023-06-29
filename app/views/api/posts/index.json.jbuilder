# @post = Post.includes(:likes, :comments).all
json.posts do 
    @posts.each do |post|
        json.set! post.id do 
            json.partial! '/api/posts/post_brief',post: post 
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
