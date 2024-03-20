const lsKey = 'form-data-applinks';

const formDataToObject = (formData) => {
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
};

export const loadFormData = () => {
    const data = localStorage.getItem(lsKey);
    if (data) {
        const formData = JSON.parse(data);
        const form = document.querySelector('form#panel-form');
        for (let key in formData) {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = formData[key];
            }
        }
        return formData;
    }
    return null;
};

export const saveForm = () => {
    const form = document.querySelector('form#panel-form');
    const formData = new FormData(form);
    localStorage.setItem(lsKey, JSON.stringify(formDataToObject(formData)));
    console.log('form data', formDataToObject(formData));
};
