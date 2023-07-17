class Api::FollowsController < ApplicationController

    def create 
        @follow=Follow.new(follow_params)
        if @follow.save 
            render :show 
        else
            render json: @follow.errors.full_messages,status: 422 
        end

    end
    def check_for_follow
        person_to_follow = params[:userid];
        currentuser=current_user;
        follow_id = current_user.follows.find_by(user_id: person_to_follow.to_i);
        if follow_id
            render json:{result: follow_id.user_id}
        else 
            render json: {result: 0}
        end
    end
    def destroy 
        @follow = Follow.find(params[:id])
        @follow.destroy
    end

    private
    def follow_params
        params.require(:follow).permit(:user_id,:follower_id )
    end
end
