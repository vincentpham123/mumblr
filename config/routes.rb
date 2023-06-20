Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '*path', to: "static_pages#frontend_index"
  post 'api/test', to: 'application#test'
  post 'api/check-email', to: 'application#check_email'
  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
  end
end
