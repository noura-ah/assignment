class Question < ApplicationRecord
    has_many :answers 

    belongs_to :test , counter_cache: true

    accepts_nested_attributes_for :answers , reject_if: proc { |attributes| attributes['choice'].blank? } ,allow_destroy: true
    # accepts_nested_attributes_for :test
end
