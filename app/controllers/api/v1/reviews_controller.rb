class Api::V1::ReviewsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_review, only: [:show, :edit, :update, :destroy]
    # protect_from_forgery with: :null_session

    def index
        @reviews = current_user.reviews.all
    end

    def show
        if authorized?
            respond_to do |format|
              format.json { render :show }
            end
        else
            handle_unauthorized
        end
    end

    def create
        # OLD CODE:
        # review = Review.new(review_params)
        
        # if review.save
        #     render json: ReviewSerializer.new(review).serialized_json
        # else
        #     render json: { error: review.errors.messages }, status: 422
        # end

        # NEW CODE:
        @review = current_user.reviews.build(review_params)
        if authorized?
            respond_to do |format|
                if @review.save
                    format.json { render :show, status: :created, location: api_v1_review_path(@review) }
                else
                    format.json { render json: @review.errors, status: :unprocessable_entity }
                end
            end
        else
            handle_unauthorized
        end
    end

    def update
        if authorized?
            respond_to do |format|
              if @review.update(review_params)
                format.json { render :show, status: :ok, location: api_v1_review_path(@review) }
              else
                format.json { render json: @review.errors, status: :unprocessable_entity }
              end
            end
        else
            handle_unauthorized
        end
    end

    def destroy
        # OLD CODE:
        # review = Review.find(params[:id])

        # if review.destroy
        #     head :no_content
        # else
        #     render json: { error: review.errors.messages }, status: 422
        # end

        # NEW CODE:
        if authorized?
            @review.destroy
            respond_to do |format|
              format.json { head :no_content }
            end
        else
            handle_unauthorized
        end
    end

    private
        def restaurant
            @restaurant ||= Restaurant.find(params[:restaurant_id])
        end

        def set_review
            @review = Review.find(params[:id])
        end

        def authorized?
            @review.user == current_user
        end

        def handle_unauthorized
            unless authorized?
            respond_to do |format|
                format.json { render :unauthorized, status: 401 }
            end
            end
        end

        def review_params
            params.require(:review).permit(:title, :description, :score, :restaurant_id)
        end
end