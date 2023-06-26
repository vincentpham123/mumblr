json.extract! post, :id, :title, :body 

json.author do 
    json.extract! post.author, :id, :username 
end
json.photoUrl post.photo.attached? ? post.photo.url : nil
json.photo1 post.photo1.attached? ? post.photo1.url : nil 
json.photo2 post.photo2.attached? ? post.photo2.url : nil
json.photo3 post.photo3.attached? ? post.photo3.url : nil 
json.photo4 post.photo4.attached? ? post.photo4.url : nil

json.date_created post.created_at.strftime('%Y-%m-%d')
json.time_created post.created_at.strftime('%H:%M')
json.date_updated post.updated_at.strftime('%Y-%m-%d')
json.time_updated post.updated_at.strftime('%H:%M')