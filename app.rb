require 'rubygems'
require 'bundler'
Bundler.require
require 'json'

configure :production do
  require 'newrelic_rpm'
  set :cache, Dalli::Client.new
end
  
configure :development do
  Bundler.require(:development)
  Dotenv.load
end

set :root, File.dirname(__FILE__)

get '/' do
  erb :front
end

get '/files' do
  @dropboxfiles ||= settings.cache.fetch("dropboxfiles", :expires_in => 60) do
    client = DropboxClient.new(ENV['DROPBOX_ACCESS_TOKEN'])
    files = client.metadata('/Public')
    files.to_json
  end
end

get '/newrelic' do
  "Yeah!"
end