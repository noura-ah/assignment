class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.string :label ,  null: false
      t.string :description
      t.integer :correct_ans
      
      t.timestamps
    end
  end
end
