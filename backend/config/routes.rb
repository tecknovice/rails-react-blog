Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    # Auth routes
    post '/auth/register', to: 'auth#register'
    post '/auth/login', to: 'auth#login'
    get '/auth/me', to: 'auth#me'
    
    # Blog routes
    resources :blogs, only: [:index, :show, :create, :update, :destroy]
    
    # Profile routes
    get '/profile', to: 'profiles#show'
    put '/profile', to: 'profiles#update'
  end
  
  namespace :admin do
    # Admin user routes
    resources :users, only: [:index, :show, :update, :destroy]
    
    # Admin blog routes
    resources :blogs, only: [:index, :update, :destroy]
  end
end
