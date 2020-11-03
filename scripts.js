/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet = '') {

  const upper = str.toLocaleUpperCase();

  let result = '';
  let strengur = -1;


/**.Notum forloop here til þess að hjálpa okkur*/
  for (let i = 0; i < str.length; i += 1) {
    strengur = alphabet.indexOf(upper[i]);
    if (strengur !== -1) {
      result += alphabet[(alphabet.indexOf(upper[i]) + n) % alphabet.length];
    }
  }
  return result;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  /**Strengnum splittað! */
  return str
    .split('')
    .toLocaleUpperCase()
    .map((a) => (alphabet.indexOf(a) < 0 ? -1
      : (alphabet.length + alphabet.indexOf(a) - n)) % alphabet.length)

    .map((b) => (i < 0 ? '' : alphabet[b]))

    .join('');
}

function LokaUtkoma(str, n, type, alphabet) {

  if(type === 'encode') {
    return encode(str, n, alphabet);
  }
  return decode(str, n, alphabet);
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;


  function init(el) {
    // Setja event handlera á viðeigandi element
    /**Gera const fyrir allt doteriið í htmlinu til ad fa virknii */

  const rangid = el.querySelector('.range');

  const stafrof = el.querySelector('.alphabet');

  const radioid = el.querySelector('.radio');

  const strengurinn = document.getElementById('input');

  const utkoma = el.querySelector('.result');

  const shiftari = rangid.querySelector('input');

  stafrof.addEventListener('change', (event) => {

    shiftari.max = alphabet.length;

    const shiftar = shiftari.value;
    
    alphabet = event.target.value;


    if (shiftar > alphabet.length) {
      shift = alphabet.length;

      shiftar.value = alphabet.length;

      rangid.querySelector('.shiftValue').innerHTML = alphabet.length;
    }

    utkoma.innerHTML = LokaUtkoma(strengurinn.value, shift, type, alphabet);
  });

  rangid.addEventListener('change', (event) => {
    
    shift = parseInt(event.target.value, 10);
    rangid.querySelector('.shiftValue').innerHTML = shift;

    utkoma.innerHTML = LokaUtkoma(strengurinn.value, shift, type, alphabet);
  });

  radioid.addEventListener('change', (event) => {
    type = event.target.value;

    utkoma.innerHTML = LokaUtkoma(strengurinn.value, shift, type, alphabet);
  });

  strengurinn.addEventListener('change', () => {

    utkoma.innerHTML = LokaUtkoma(strengurinn.value, shift, type, alphabet);
  });
}

return {
  init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
  