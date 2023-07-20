class Api::PostsController < ApplicationController

    before_action :set_post, only: [:show, :update, :destroy]

    def index 
            page_number = params[:page_number].to_i 
            type = params[:type]
            number_of_posts = 5
            offset = (page_number-1) * number_of_posts
            user = current_user
            case type 
                when 'foryou'
                    @posts = Post
                                .includes(:comments,:likes,:author)
                                .joins(:author)
                                .where(users: { id: user.follows.pluck(:user_id) })
                                .limit(number_of_posts)
                                .offset(offset)
                when 'trending'
                    @posts = Post
                                .includes(:comments,:likes,:author)
                                .select('posts.*,COUNT(DISTINCT comments.id) as comments_count, COUNT(DISTINC likes.id) as likes_count')
                                .left_joins(:comments,:likes)
                                .group('posts.id')
                                .order(Arel.sql('comments_count + likes_count DESC'))
                                .limit(number_of_posts)
                                .offset(offset)
                when 'preview'
                    @posts = Post
                                .includes(:comments,:likes,:author)
                                .order(Arel.sql('RANDOM()'))
                                .limit(number_of_posts)
                                .offset(offset)
                else 
                    @posts = Post.includes(:comments,:likes).limit(number_of_posts).offset(offset)
            end
            @posts_left = @posts.length === 5 ? true : false
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
        #take in pagenumber to know which section of the data to pass in 
        #type to know if trending or following 
        params.require(:post).permit(:title,:body,:author_id,:photo1,:photo2,:photo3,:photo4,:user_id,:type,:page_number)
    end
end
