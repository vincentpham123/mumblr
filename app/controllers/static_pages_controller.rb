class StaticPagesController < ApplicationController
    def frontend_index
        render file: Rails.root.join('publc','index.html')
    end
end
