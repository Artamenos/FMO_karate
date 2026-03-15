document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('formValid', function (event) {
        const formData = event.detail;

        console.clear();
        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Направление:', formData.direction || '(не выбрано)');
        console.log('Зал:', formData.location || '(не выбрано)');
        console.log('Согласие:', formData.agreement ? 'Да' : 'Нет');
        console.log('Отправлено:', new Date().toLocaleString());
    });
});