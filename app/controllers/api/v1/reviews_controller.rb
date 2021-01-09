module Api
    module V1
        class ReviewsController < ApplicationController
            before_action :set_review, only: [:show, :edit, :update, :destroy]
            protect_from_forgery with: :null_session

            def index
                @reviews = Review.all
            end

            def show
            end

            def create
                review = Review.new(review_params)
                
                if review.save
                    render json: ReviewSerializer.new(review).serialized_json
                else
                    render json: { error: review.errors.messages }, status: 422
                end
            end

            def update
            end

            def destroy
                review = Review.find(params[:id])

                if review.destroy
                    head :no_content
                else
                    render json: { error: review.errors.messages }, status: 422
                end
            end

            private

            def restaurant
                @restaurant ||= Restaurant.find(params[:restaurant_id])
            end

            def set_review
                @review = Review.find(params[:id])
            end

            def review_params
                params.require(:review).permit(:title, :description, :score, :restaurant_id)
            end
        end
    end
end