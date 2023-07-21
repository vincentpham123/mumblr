    json.comment do
        json.extract! @comment, :id, :body, :post_id
        json.commenter do 
            json.extract! @comment.user, :id, :username
            json.profilepic @comment.user.profilepic.attached? ? @comment.user.profilepic.url : nil
        end
    end

    json.post do 
        json.partial! '/api/posts/post_brief', post: @comment.post
    end

