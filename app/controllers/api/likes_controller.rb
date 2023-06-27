class Api::LikesController < ApplicationController

    def create
        @like = Like.new(like_params);
        @post = Post.find_by(id: params[:post_id]);
        if @like.save 
            render :show, locals: {post: @post}
        else
            render json: @like.errors.full_messages,status: 422 
        end
    end

    def destroy 
        # need to pass in like_id in body 
        @like=Like.find(params[:id])
        @like.destroy 
    end

    private

    def like_params
        params.require(:like).permit(:user_id,:post_id)
    end
end
