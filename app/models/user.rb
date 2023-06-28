# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'open-uri'
class User < ApplicationRecord
  
  validates :username,
    uniqueness: true,
    length: {in: 3..30},
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "cannot be an email"}

  validates :email,
    uniqueness: true,
    length: {in: 3..255},
    format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :session_token, presence: true, uniqueness: true 
  validates :password, length: {in: 6..255}, allow_nil: true 
  has_secure_password

  before_validation :ensure_session_token, :generate_bg_pic, :generate_profile_pic


  #associations
  has_many :posts,
    foreign_key: :author_id,
    class_name: :Post,
    dependent: :destroy
  
  has_many :likes,
    dependent: :destroy

  has_many :liked_videos,
    through: :likes,
    source: :post 
    
    has_one_attached :profilepic 
    
    has_one_attached :background
    #in jbuilder, i can grab the followers for each user 
    
    def generate_profile_pic
      default_images =['https://mumblr-seeds.s3.us-west-1.amazonaws.com/defaultavatar1.png',
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
      random_number=rand(10)
      unless self.profilepic.attached? 
        profile_pic = URI.open(default_images[random_number])
        self.profilepic.attach(io:profile_pic, filename:"default.png")
      end
  
    end

    def generate_bg_pic
      unless self.background.attached?
        bg = URI.open('https://mumblr-seeds.s3.us-west-1.amazonaws.com/defaultbackground.png')
        self.background.attach(io:bg,filename:'defaultbg.png')
      end
    end
  #controller methods

  def self.find_by_credentials(credential,password)
    @user = URI::MailTo::EMAIL_REGEXP.match(credential) ? User.find_by(email: credential) : User.find_by(username: credential);

    if @user && @user.authenticate(password) 
      return @user
    else
      return nil 
    end 
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end
  private

  def generate_unique_session_token 
    loop do 
      token = SecureRandom.base64
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

end
