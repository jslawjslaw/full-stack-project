Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  match 'api/forms/fetch_form/:permanent_link' => 'api/forms#fetch_form', via: :get

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :forms, only: [:create, :show, :index, :update, :destroy] do
      resources :fields, only: [:create, :show, :index, :update, :destroy]
    end
  end
end
