json.extract! post, :id, :title, :body 

json.author do 
    json.extract! post.author, :id, :username 
end
json.photoUrl post.photo.attached? ? post.photo.url : nil

json.date_created post.created_at.strftime('%Y-%m-%d')
json.time_created post.created_at.strftime('%H:%M')
json.date_updated post.updated_at.strftime('%Y-%m-%d')
json.time_updated post.updated_at.strftime('%H:%M')