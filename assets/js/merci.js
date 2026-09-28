// Page /merci : ne s'affiche qu'apres un envoi reel du formulaire Tally.
// main.js pose le marqueur 'fx-formulaire-envoye' a l'envoi ; il est consomme ici une seule fois,
// si bien qu'un rechargement ou une visite directe ne compte jamais de conversion.
// Charge dans le <head> (sans defer) pour rediriger avant tout affichage.
// Apercu sans conversion ni redirection : /merci?apercu
(function () {
  'use strict';

  if (/[?&]apercu\b/.test(window.location.search)) return;

  var envoye;
  try {
    envoye = sessionStorage.getItem('fx-formulaire-envoye') === '1';
    sessionStorage.removeItem('fx-formulaire-envoye');
  } catch (e) {
    envoye = null; // stockage bloque : on affiche la page sans compter de conversion
  }

  if (envoye === false) {
    window.location.replace('/contact');
    return;
  }
  if (!envoye) return;

  // Evenement generique (utilisable par Google Tag Manager : declencheur "formulaire_envoye").
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'formulaire_envoye' });

  // Conversion Google Ads, si configuree (SITE.googleAds dans src/site/config.mjs).
  var cfg = {};
  try { cfg = JSON.parse(document.getElementById('merci-config').textContent); } catch (e) { /* pas de config */ }
  if (!cfg.adsId || !cfg.conversionLabel) return;

  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', cfg.adsId);
  window.gtag('event', 'conversion', { send_to: cfg.adsId + '/' + cfg.conversionLabel });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.adsId);
  document.head.appendChild(s);
})();
