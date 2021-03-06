# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161215221304) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "entries", force: :cascade do |t|
    t.integer  "submission_id",              null: false
    t.integer  "field_id",                   null: false
    t.text     "value",         default: [],              array: true
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["submission_id"], name: "index_entries_on_submission_id", using: :btree
  end

  create_table "fields", force: :cascade do |t|
    t.string   "field_type",       null: false
    t.string   "label",            null: false
    t.string   "user_instruction"
    t.integer  "form_id",          null: false
    t.integer  "ord",              null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "choices"
    t.index ["form_id"], name: "index_fields_on_form_id", using: :btree
  end

  create_table "forms", force: :cascade do |t|
    t.string   "title",           null: false
    t.string   "description",     null: false
    t.integer  "author_id",       null: false
    t.string   "permanent_link",  null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.boolean  "private",         null: false
    t.string   "password_digest"
    t.index ["author_id"], name: "index_forms_on_author_id", using: :btree
  end

  create_table "submissions", force: :cascade do |t|
    t.integer  "form_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["form_id"], name: "index_submissions_on_form_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "session_token",   null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
