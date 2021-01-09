Rails.application.routes.draw do
  devise_for :users
  authenticated :user do
    root "pages#my_restaurants", as: :authenticated_root
  end
  root 'pages#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :restaurants, param: :slug
      resources :reviews, only: [:index, :show, :create, :update, :destroy]
    end
  end

  get '*path', to: 'pages#index', via: :all
end
