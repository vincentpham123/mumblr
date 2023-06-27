
json.extract! @user, :id, :email, :username
json.date_created @user.created_at.strftime('%Y-%m-%d')
json.time_created @user.created_at.strftime('%H:%M')
json.date_updated @user.updated_at.strftime('%Y-%m-%d')
json.time_updated @user.updated_at.strftime('%H:%M')

