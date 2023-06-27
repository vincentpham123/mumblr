
@users.each do |user|
    json.set! user.username do 
        json.partial! '/api/users/user_brief',user: user 
    end
end