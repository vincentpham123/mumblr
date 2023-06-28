class Api::PostsController < ApplicationController

    before_action :set_post, only: [:show, :update, :destroy]

    def index 
        if params[:query]
            #find posts with tag 
            # take string in query 
            #find posts where 
            tag = params[:query]
            #hype#2023
            @posts = Post.where('posts.tags LIKE ?', "#{tag}")
        else
            @posts = Post.all
        end
    end

    def show
        @post = Post.find_by(id: params[:id])
    end

    def create 
        
        @post = Post.new(post_params)

        if @post.save 
            render :show, locals: {post: @post}
        else
            render json: @post.errors.full_messages,status: 422
        end
    end

    def update 
        if @post.update(post_params)
            render :show, locals: {post: @post}
        else
            render json: @post.errors.full_messages,status: 422
        end

    end

    def destroy
        @post.destroy 
        head :no_content
    end

    private
    def set_post 
        @post = Post.find(params[:id])
    rescue
        render json: ['post not found'], status: :not_found
    end
    def post_params
        params.require(:post).permit(:title,:body,:author_id,:photo1,:photo2,:photo3,:photo4,:user_id)
    end
end
