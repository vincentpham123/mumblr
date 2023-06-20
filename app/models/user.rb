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

  before_validation :ensure_session_token 


  #associations
  has_many :posts,
    foreign_key: :author_id,
    class_name: :Post,
    dependent: :destroy
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
