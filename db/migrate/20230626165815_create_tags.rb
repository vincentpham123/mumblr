class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.references :post, null: false, foreign_key: true
      t.string :hashtag, null: false
      t.timestamps
    end
    add_index :tags, [:hashtag, :post_id], unique: true
  end
end
