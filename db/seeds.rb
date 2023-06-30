# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
User.destroy_all
Post.destroy_all
Comment.destroy_all
Like.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('posts')
ApplicationRecord.connection.reset_pk_sequence!('comments')
ApplicationRecord.connection.reset_pk_sequence!('likes')

puts "Creating users..."
# Create one user with an easy to remember username, email, and password:
demo_user = User.create!(
  username: 'Demo-lition',
  email: 'demo@user.io',
  password: 'password'
)

# More users
users = []
10.times do
  username = Faker::Internet.unique.username(specifier: 3)
  email = Faker::Internet.unique.safe_email(name: username)
  users << User.create!(
    username: username,
    email: email,
    password: 'password'
  )
end

puts "Creating posts..."
users.each do |user|
  5.times do
    paragraphs = Faker::Lorem.paragraphs(number: 3)
    body = paragraphs.join("\r\n")

    post = Post.create!(
      author_id: user.id,
      title: Faker::Lorem.sentence,
      body: body
    )

    # Create comments for each post
    3.times do
      Comment.create!(
        user_id: users.sample.id,
        post_id: post.id,
        body: Faker::Lorem.sentence
      )
    end

    # Create likes for each post
    liked_users = users.sample(5).uniq # Randomly select 5 unique users
    liked_users.each do |liked_user|
      Like.create!(
        user_id: liked_user.id,
        post_id: post.id
      )
    end
  end
end

default_images = [
  'https://mumblr-seeds.s3.us-west-1.amazonaws.com/defaultavatar1.png',
  'https://mumblr-seeds.s3.us-west-1.amazonaws.com/defualtavatar2.png',
  'https://mumblr-seeds.s3.us-west-1.amazonaws.com/defualtimage3.png',
  'https://mumblr-seeds.s3.us-west-1.amazonaws.com/defaultprofilepic4.png',
  'https://mumblr-seeds.s3.us-west-1.amazonaws.com/defaultimage5.png',
  'https://mumblr-seeds.s3.us-west-1.amazonaws.com/defualtimage6.png',
  'https://mumblr-seeds.s3.us-west-1.amazonaws.com/di7.png',
  'https://mumblr-seeds.s3.us-west-1.amazonaws.com/di8.png',
  'https://mumblr-seeds.s3.us-west-1.amazonaws.com/di9.png',
  'https://mumblr-seeds.s3.us-west-1.amazonaws.com/di10.png'
]
User.all.each_with_index do |user, index|
  random_number = rand(10)
  profile_pic = URI.open(default_images[random_number])
  bg = URI.open('https://mumblr-seeds.s3.us-west-1.amazonaws.com/defaultbackground.png')
  user.profilepic.attach(io: profile_pic, filename: "default.png")
  user.background.attach(io: bg, filename: 'bg.png')
end

puts "Done!"


