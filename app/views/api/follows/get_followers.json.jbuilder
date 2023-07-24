json.followers do 
    @followers.each do |follower|
        json.set! follower.id do 
            json.extract! follower, :id, :user_id, :follower_id 
        end
    end

end
json.users do 
    @followers.each do |follower|
        json.set! follower.follower.id do 
            json.extract! follower.follower, :username, :id
            json.profilepic follower.follower.profilepic.attached? ? follower.follower.profilepic.url : nil 
            json.background follower.follower.background.attached? ? follower.follower.background.url : nil
        end
    end
end