Rails.application.routes.draw do
  post '/input', to: 'wordmove#input', as: 'input'
end
