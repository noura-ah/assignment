class RenameTestNameToNameInTests < ActiveRecord::Migration[7.0]
  def up
    # rename_column :table_name, :old_column, :new_column
    rename_column :tests, :testName, :name
  end
  def down
    # Note that the columns are reversed
    rename_column :tests, :testName, :name
  end
end
