json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at
    json.profilepic @user.profilepic.attached? ? @user.profilepic.url : nil
    json.background @user.background.attached? ? @user.background.url : nil

end

# i can nest and then during my payload, i can extract and dispatch 
# the likes to my state
json.posts do 
    @user.posts.each do |post|
        json.set! post.id do
            json.extract! post, :id, :title, :body
            json.photo1 post.photo1.attached? ? post.photo1.url : nil 
            json.photo2 post.photo2.attached? ? post.photo2.url : nil
            json.photo3 post.photo3.attached? ? post.photo3.url : nil 
            json.photo4 post.photo4.attached? ? post.photo4.url : nil
            json.author do 
                json.extract! post.author, :id, :username
            end
            json.commentcount post.comments.length 
            json.likescount post.likes.length
        end
    end
end
# for a user, i need to pull all their likes and the posts associated 
#with those likes







