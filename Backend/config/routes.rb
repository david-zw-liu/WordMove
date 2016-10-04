Rails.application.routes.draw do
  post '/input', to: 'wordmove#input', as: 'input'
  post '/result', to: 'wordmove#save_result', as: 'save_result'
  get '/result/:id', to: 'wordmove#get_result', as: 'get_result'
end
