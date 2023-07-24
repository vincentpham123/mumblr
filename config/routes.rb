Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'
  post 'api/check-email', to: 'application#check_email'
  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:index,:create,:show,:update,:destroy] 
    
    # get 'api/users/:username', to: 'users#show_with_username'
    resource :session, only: [:show, :create, :destroy]
    resources :posts
    resources :likes, only: [:index,:create,:destroy]
    resources :comments, only: [:index, :create, :destroy,:update]
    resources :follows, only: [:create, :destroy]
    get '/checkpostlike/:postid', to: 'likes#check_for_like'
    get '/checkfollowstatus/:userid', to: 'follows#check_for_follow'
    resources :tags, only: [:create]
    get '/users/:userid/follows', to: 'follows#get_follows'
    get '/users/:userid/followers', to: 'follows#get_followers'
  end
  get '*path', to: "static_pages#frontend_index"
end
