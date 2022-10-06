class Test < ApplicationRecord
    has_many :questions 

    accepts_nested_attributes_for :questions , reject_if: proc { |attributes| attributes['label'].blank? }, allow_destroy: true
    # accepts_nested_attributes_for :answers
end
