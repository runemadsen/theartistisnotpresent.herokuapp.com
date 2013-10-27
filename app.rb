require 'rubygems'
require 'bundler'
Bundler.require
require 'json'

configure :production do
  require 'newrelic_rpm'
end
  
configure :development do
  Bundler.require(:development)
  Dotenv.load
end

set :root, File.dirname(__FILE__)
set :cache, Dalli::Client.new(ENV["MEMCACHIER_SERVERS"], {:expires_in => 60, :username => ENV["MEMCACHIER_USERNAME"], :password => ENV["MEMCACHIER_PASSWORD"]})

get '/' do
  @js_data = {
    :endpoint => ENV['DROPBOX_ENDPOINT']
  }
  erb :front
end

get '/run/:folder' do
  @js_data = {
    :endpoint => ENV['DROPBOX_ENDPOINT'],
    :folder => params[:folder]
  }
  erb :run
end

get '/files/?:folder?' do
  @dropboxfiles ||= settings.cache.fetch("cached-#{params[:folder]}") do
    client = DropboxClient.new(ENV['DROPBOX_ACCESS_TOKEN'])
    files = client.metadata("/Public/#{params[:folder]}")
    files.to_json
  end
end

get '/newrelic' do
  "Yeah!"
end