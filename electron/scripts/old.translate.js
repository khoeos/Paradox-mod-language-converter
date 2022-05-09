/* eslint-disable */
const fs = require('fs');
const dirTree = require('directory-tree');
let debug = true;
let languages = ['french', 'german', 'polish', 'russian', 'spanish', 'simp_chinese', 'braz_por'];

let gameKey = null;

// G:\SteamLibrary\steamapps\workshop\content\281990

async function translate(dir, language) {
  // Selection de la langue de base
  // Possibilité d'extraire les fichiers de trad au lieu de les ajouter dans un dossier
  // cas ou il y a un fichier de trad classique dans le dossier replace, mais pas la version de la langue - 1100284147
  dirTree(dir, { extensions: /\.yml$/ }, (item, path, stats) => {
    console.log('test');
    // Vérifie si dans le chemin du fichier, il y a le dossier localization
    // Si non, passe le fichier
    if (path.split('\\').indexOf(gameKey) === -1) {
      console.log('1');
      return;
    }
    // Ignore les fichiers qui ne sont pas dans un sous dossier english
    // Sauf ceux qui sont à la racine du dossier localization
    if (
      path.split('\\').indexOf('english') === -1 &&
      path.split('\\').indexOf(gameKey) + 2 != path.split('\\').length
    ) {
      console.log('2');
      return;
    }
    // Si le chemin contient le dossier replace, ignore ce fichier
    // (à gérer plus tard car la nomenclature est différente)
    if (path.split('\\').indexOf('replace') != -1) {
      console.log('3');
      return;
    }

    debug ? console.log(' ') : '';

    debug ? console.log('FIRST BLOCK') : '';
    // Décompose le chemin du fichier
    let locPath = path.split('\\');
    debug ? console.log(locPath) : '';
    //
    let filePath = locPath.splice(locPath.indexOf(gameKey) + 1, locPath.length - locPath.indexOf(gameKey));
    debug ? console.log(filePath) : '';
    debug ? console.log(' ') : '';

    // Ignore le fichier ne contient pas la nomenclature indiquant qu'il s'agit d'une source anglaise
    if (filePath[filePath.length - 1].match(/l_english/g) === null) {
      console.log(' ');
      return;
    }

    debug ? console.log('SECOND BLOCK') : '';
    filePath[filePath.length - 1] = filePath[filePath.length - 1].replace(/l_english/g, `l_${language}`);
    debug ? console.log(filePath) : '';

    // Récupere le contenu du fichier
    let content = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
    // console.log(content)
    content = content.replace(/l_english/g, `l_${language}`);
    // console.log(content)
    debug ? console.log(' ') : '';

    debug ? console.log('THIRD BLOCK') : '';
    // Vérifie si le fichier est à la racine du dossier localization
    // Si non, place remplace le nom du dossier par la langue visée
    if (filePath.length > 1) {
      filePath[0] = language;
    }
    debug ? console.log(filePath) : '';

    // Défini le nouveau chemin du fichier
    let newPath = locPath.join('/') + '/' + filePath.join('/');
    debug ? console.log(newPath) : '';
    // Récupère/crée le chemin pour le fichier le log qui contiendra la liste des fichiers ajoutés
    let logPath = locPath.join('/') + '/.addedFiles';
    debug ? console.log(logPath) : '';
    console.log(' ');

    debug ? console.log('FOURTH BLOCK') : '';
    let folders = filePath;
    debug ? console.log(folders) : '';
    let a = folders.pop();
    debug ? console.log(a) : '';
    let dirPath = locPath.join('/') + '/' + folders.join('/');
    debug ? console.log(dirPath) : '';
    filePath.push(a);
    debug ? console.log(filePath) : '';

    debug ? '' : console.log("CONVERTING '" + path + "'");
    debug ? '' : console.log("        TO '" + locPath.join('\\') + '\\' + filePath.join('\\') + "'");

    debug ? console.log('FIFTH BLOCK') : '';
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(newPath, content, { encoding: 'utf8', flag: 'wx' });
      fs.writeFileSync(logPath, `/${filePath.join('/')} \n`, { encoding: 'utf8', flag: 'a' });
      fs.writeFileSync('.logs', `Added file : ${newPath} \n`, { encoding: 'utf8', flag: 'a' });
      debug ? console.log('File added') : '';
    } catch (error) {
      if (error.errno === -4075) {
        console.log('File already exist');
      } else {
        console.log(error);
      }
    }

    debug ? console.log(' ') : '';
    console.log(' ');
  });
  return console.log('Finish');
}

let form = document.getElementById('form');
async function handleForm(e) {
  console.log('Start');
  lang = [];
  languages.forEach((el) => {
    document.getElementById(el).checked ? lang.push(el) : '';
  });
  switch (document.getElementById('game').value) {
    case 'stellaris':
      gameKey = 'localisation';
      break;
    case 'ck3':
      gameKey = 'localization';
      break;
    case 'eu4':
      gameKey = 'localisation';
      break;
    default:
      gameKey = 'localisation';
      break;
  }
  console.log(lang);
  console.log(gameKey);
  lang.forEach((el) => {
    translate(document.getElementById('folder').value, el);
  });
  e.preventDefault();
}

form.addEventListener('submit', handleForm);

document.getElementById('about').addEventListener('click', () => {
  require('electron').shell.openExternal('https://github.com/khoeos/Paradox-localization-Converter-V2');
});

const debugBtn = document.getElementById('debug');

debugBtn.addEventListener('click', () => {
  if (debug) {
    debug = false;
    alert('Debug mode desactivated');
    debugBtn.classList.add('line-through', 'opacity-20');
  } else {
    debug = true;
    alert('Debug mode activated. \nGet informations on Github \nCtrl+maj+i to open console');
    debugBtn.classList.remove('line-through', 'opacity-20');
  }
});
