class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  # def show_with_username
  #   @user = User.first
  #   render 'get_by_username'
  # end

  def index 
    @users= User.all 
  end
  def create
    @user = User.new(user_params)
    if @user.save 
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

 
  
  def show 
    # can use by username
    # debugger
    @user = User.find_by(id: params[:id]);
    # username=params[:id]
    # @user =User.where('users.username = ?', username)
    # debugg er
    render :show
  end

  def destroy 
    @user = User.find(params[:id])
  end

  def update 
    @user = User.find(params[:id])
    if @user.update(user_update_params)
      render :show 
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  
  private 
  def user_params
    params.require(:user).permit(:email,:username,:password,:profilepic,:background)
  end
  def user_update_params 
    params.require(:user).permit(:email, :username, :profilepic,:background)
  end
end
