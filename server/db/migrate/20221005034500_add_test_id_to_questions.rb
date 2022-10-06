class AddTestIdToQuestions < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :test_id, :integer
    add_index :questions, :test_id
  end
end
