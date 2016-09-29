class CreateGifs < ActiveRecord::Migration[5.0]
  def change
    create_table :gifs do |t|
      t.string :url
      t.integer :count
      t.references :word, foreign_key: true

      t.timestamps
    end
  end
end
