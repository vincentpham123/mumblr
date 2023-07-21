json.post do
    json.partial! '/api/posts/post_brief', post: @post
end