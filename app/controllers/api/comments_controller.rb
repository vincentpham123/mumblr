class Api::CommentsController < ApplicationController

    def create
        @comment = Comment.new(comment_params)
        if @comment.save 
            render :show
            #show will provide comment data to update the state 
        else
            render json: @comment.errors.full_messages,status: 422 
        end
    end

    def destroy 
        @comment = Comment.find(params[:id])
        @post = @comment.post
        @comment.destroy 
    end

    def update 
        @comment = Comment.find(params[:id])
        if @comment.update(comment_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    private 
    def comment_params 
        params.require(:comment).permit(:user_id,:post_id,:body)
    end
end
