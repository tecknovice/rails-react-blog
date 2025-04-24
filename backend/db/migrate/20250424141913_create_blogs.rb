class CreateBlogs < ActiveRecord::Migration[8.0]
  def change
    create_table :blogs do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :content
      t.string :status
      t.datetime :published_at

      t.timestamps
    end
  end
end
