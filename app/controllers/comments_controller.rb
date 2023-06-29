class CommentsController < ApplicationController

    def create
        @post = Post.new(comment_params)
        if @post.save 
            render :show
            #show will provide comment data to update the state 
        else
            render json: @post.errors.full_messages,status: 422 
        end
    end

    def destroy 
        @comment = comment.find(params[:id])
        @comment.destroy 
    end

    private 
    def comment_params 
        params.require(:comment).require(:user_id,:post_id,:body)
    end
end
