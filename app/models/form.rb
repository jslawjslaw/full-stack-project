# == Schema Information
#
# Table name: forms
#
#  id             :integer          not null, primary key
#  title          :string           not null
#  description    :string           not null
#  author_id      :integer          not null
#  permanent_link :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  private        :boolean          not null
#

class Form < ActiveRecord::Base
  validates :title, :description, :user, :permanent_link, presence: true
  validates_inclusion_of :private, in: [true, false]
  after_initialize :ensure_permanent_link!

  belongs_to(
    :user,
    class_name: :User,
    primary_key: :id,
    foreign_key: :author_id
  )

  has_many(
    :fields,
    class_name: :Field,
    primary_key: :id,
    foreign_key: :form_id,
    dependent: :destroy
  )

  has_many(
    :submissions,
    class_name: :Submission,
    primary_key: :id,
    foreign_key: :form_id
  )

  def self.generate_permanent_link
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_permanent_link!
    unless self.permanent_link
      self.permanent_link = Form.generate_permanent_link
    end
    self.permanent_link
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.check_password(form_id, password)
    form = Form.find(form_id)
    if form && form.is_password?(password)
      true
    else
      false
    end
  end
end
