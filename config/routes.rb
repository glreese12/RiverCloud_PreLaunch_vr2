LaunchSoon::Application.routes.draw do
  root :to => "home#index"
  match '/interested' => "home#interested"
  match '/home' => 'pages#home'
  match '/about', :to => 'pages#about', :as => 'pages_about'
  match '/product_app', :to => 'pages#product_app', :as => 'pages_product_app'
  match '/contact' => 'pages#contact'


end
