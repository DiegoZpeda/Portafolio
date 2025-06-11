let currentLang = 'es';

document.getElementById('translateBtn').addEventListener('click', (e) => {
  e.preventDefault(); // Previene scroll no deseado

  const scrollY = window.scrollY; // Guarda la posición actual del scroll

  // Alternar idioma
  currentLang = currentLang === 'es' ? 'en' : 'es';
  document.getElementById('translateBtn').textContent = currentLang === 'es' ? 'EN' : 'ES';

  // Cargar traducciones y restaurar scroll
  loadTranslations(currentLang).then(() => {
    window.scrollTo({ top: scrollY }); // Restaurar scroll
  });
});

function loadTranslations(lang) {
  return fetch(`assets/js/lang/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');

        if (key.startsWith('[placeholder]')) {
          const realKey = key.replace('[placeholder]', '');
          if (translations[realKey]) el.setAttribute('placeholder', translations[realKey]);

        } else if (key.startsWith('[value]')) {
          const realKey = key.replace('[value]', '');
          if (translations[realKey]) el.setAttribute('value', translations[realKey]);

        } else if (key.startsWith('[title]')) {
          const realKey = key.replace('[title]', '');
          if (translations[realKey]) el.setAttribute('title', translations[realKey]);

        } else {
          if (translations[key]) el.textContent = translations[key];
        }
      });
    })
    .catch(err => console.error('Error cargando traducciones:', err));
}
