
    json.extract! @comment, :id, :body, :post_id,
    json.commenter do 
        json.extract! @comment.user, :id, :username
        json.profilepic @comment.user.profilepic.attached? ? @comment.user.profilepic.url : nil
    end

