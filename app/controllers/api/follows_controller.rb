class Api::FollowsController < ApplicationController

    def create 
        @follow=Follow.new(follow_params)
        if @follow.save 
            render :show 
        end 

    end

    def destroy 
        @follow = Follow.find(params[:id])
        @follow.destroy
    end

    def follow_params
        params.require(:follow).permit(:user_id,:follower_id )
    end
end
