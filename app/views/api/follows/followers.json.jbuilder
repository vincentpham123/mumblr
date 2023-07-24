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
            json.extract! author, :username, :id
            json.profilepic author.profilepic.attached? ? author.profilepic.url : nil 
            json.background author.background.attached? ? author.background.url : nil
        end
    end
end