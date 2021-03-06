export const fetchForms = () => {
  return $.ajax({
    method: "GET",
    url: "/api/forms"
  });
};

export const fetchForm = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/forms/${id}`
  });
};

export const createForm = (form) => {
  return $.ajax({
    method: "POST",
    url: "/api/forms",
    data: { form }
  });
};

export const updateForm = (form, render) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/forms/${form.id}`,
    data: { form, render }
  });
};

export const deleteForm = (formId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/forms/${formId}`
  });
};

export const fetchFormByPL = (permanent_link) => {
  return $.ajax({
    method: "GET",
    url: `/api/forms/fetch_form/${ permanent_link }`
  });
}

export const checkPassword = (form_id, password) => {
  return $.ajax({
    method: "GET",
    url: `/api/forms/check_password`,
    data: { form_id, password }
  });
}

export const createPassword = (form_id, password) => {
  return $.ajax({
    method: "POST",
    url: `/api/forms/create_password`,
    data: { form_id, password }
  });
}
