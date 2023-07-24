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
            json.extract! author, :username, :id
            json.profilepic author.profilepic.attached? ? author.profilepic.url : nil 
            json.background author.background.attached? ? author.background.url : nil
        end
    end
end