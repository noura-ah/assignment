class AddFieldsToTests < ActiveRecord::Migration[7.0]
  def change
    add_column :tests, :description, :string
    remove_column :tests, :num_q
    add_column :tests, :questions_count, :integer, default: 0
    Test.reset_column_information
    Test.all.each do |c|
      Test.update_counters c.id, questions_count: c.questions.length
    end
  end
  def down
    remove_column :tests, :questions_count
    
  end
end
