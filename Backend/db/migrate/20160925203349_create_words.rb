class CreateWords < ActiveRecord::Migration[5.0]
  def change
    create_table :words do |t|
      t.string :zh_word
      t.string :en_word
      t.string :sound_path
      t.timestamps
    end
  end
end
