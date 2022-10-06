class AddFieldsToQuestions < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :label, :string , null: false
    add_column :questions, :correct_ans, :string
  end
end
