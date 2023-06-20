class StaticPagesController < ApplicationController::Base
    def frontend_index
        render file: Railes.root.join('publc','index.html')
    end
end
