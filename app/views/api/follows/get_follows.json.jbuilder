json.follows do 

    @follows.each do |follow|
        json.set! follow.id do 
            json.extract! follow, :id, :user_id, :follower_id 
        end
    end
end

json.users do 
    @follows.each do |follow|
        json.set! follow.user.id do 
            json.extract! follow.user, :username, :id
            json.profilepic follow.user.profilepic.attached? ? follow.user.profilepic.url : nil 
            json.background follow.user.background.attached? ? follow.user.background.url : nil
        end
    end
end