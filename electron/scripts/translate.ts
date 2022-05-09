/* eslint-disable no-unused-expressions */
import fs from 'fs';
import { gameKey } from './variables';
import { requestInterface } from './interfaces';

// const debug = false;
// const language = 'french';

const dirTree = require('directory-tree');

export const translate = async (request: requestInterface) => {
  const logs: string[] = [];
  // debug ? console.log(request) : '';
  const singleTranslate = (language: string) => {
    dirTree(request.path, { extensions: /\.yml$/ }, (_item: any, path: any): any => {
      // Vérifie si dans le chemin du fichier, il y a le dossier localization
      // Si non, passe le fichier
      if (path.split('\\').indexOf(gameKey[request.game as keyof typeof gameKey]) === -1) {
        return null;
      }

      // Ignore les fichiers qui ne sont pas dans un sous dossier english
      // Sauf ceux qui sont à la racine du dossier localization
      if (
        path.split('\\').indexOf(request.sourceLanguage ?? 'english') === -1 &&
        path.split('\\').indexOf(gameKey[request.game as keyof typeof gameKey]) + 2 !== path.split('\\').length
      ) {
        return null;
      }

      // Si le chemin contient le dossier replace, ignore ce fichier
      // (à gérer plus tard car la nomenclature est différente)
      if (path.split('\\').indexOf('replace') !== -1) {
        return null;
      }
      // debug ? console.log('FIRST BLOCK') : '';
      // Décompose le chemin du fichier
      const locPath = path.split('\\');
      // debug ? console.log(locPath) : '';
      //
      // console.log(gameKey);
      const filePath = locPath.splice(
        locPath.indexOf(gameKey[request.game as keyof typeof gameKey]) + 1,
        locPath.length - locPath.indexOf(gameKey[request.game as keyof typeof gameKey])
      );
      // debug ? console.log(filePath) : '';
      // debug ? console.log(' ') : '';

      // Ignore le fichier ne contient pas la nomenclature indiquant qu'il s'agit d'une source anglaise
      if (filePath[filePath.length - 1].match(/l_english/g) === null) {
        // console.log(' ');
        return null;
      }

      // debug ? console.log('SECOND BLOCK') : '';
      filePath[filePath.length - 1] = filePath[filePath.length - 1].replace(/l_english/g, `l_${language}`);
      // debug ? console.log(filePath) : '';

      // Récupere le contenu du fichier
      let content = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
      // console.log(content)
      content = content.replace(/l_english/g, `l_${language}`);
      // console.log(content)
      // debug ? console.log(' ') : '';

      // debug ? console.log('THIRD BLOCK') : '';
      // Vérifie si le fichier est à la racine du dossier localization
      // Si non, place remplace le nom du dossier par la langue visée
      if (filePath.length > 1) {
        filePath[0] = language;
      }
      // debug ? console.log(filePath) : '';

      // Défini le nouveau chemin du fichier
      const newPath = `${locPath.join('/')}/${filePath.join('/')}`;
      // debug ? console.log(newPath) : '';
      // Récupère/crée le chemin pour le fichier le log qui contiendra la liste des fichiers ajoutés
      const logPath = `${locPath.join('/')}/.addedFiles`;
      // debug ? console.log(logPath) : '';
      // console.log(' ');

      // debug ? console.log('FOURTH BLOCK') : '';
      const folders = filePath;
      // debug ? console.log(folders) : '';
      const a = folders.pop();
      // debug ? console.log(a) : '';
      const dirPath = `${locPath.join('/')}/${folders.join('/')}`;
      // debug ? console.log(dirPath) : '';
      filePath.push(a);
      // debug ? console.log(filePath) : '';
      logs.push(`CONVERTING '${path}'`);
      logs.push(`TO '${locPath.join('\\')}\\${filePath.join('\\')}'`);

      // debug ? '' : console.log(`CONVERTING '${path}'`);
      // debug ? '' : console.log(`TO '${locPath.join('\\')}\\${filePath.join('\\')}'`);

      // debug ? console.log('FIFTH BLOCK') : '';
      try {
        fs.mkdirSync(dirPath, { recursive: true });
        fs.writeFileSync(newPath, content, { encoding: 'utf8', flag: 'wx' });
        fs.writeFileSync(logPath, `/${filePath.join('/')} \n`, { encoding: 'utf8', flag: 'a' });
        fs.writeFileSync('.logs', `Added file : ${newPath} \n`, { encoding: 'utf8', flag: 'a' });
        logs.push('File added');
        // debug ? console.log('File added') : '';
      } catch (error: any) {
        if (error.errno === -4075) {
          logs.push('File already exist');
          // console.log('File already exist');
        } else {
          console.log(error);
        }
      }
      logs.push(' ');
      // debug ? console.log(' ') : '';
      // console.log(' ');
      return null;
    });
  };

  request.outputLanguages.forEach((language) => {
    singleTranslate(language);
  });
  // console.log(logs);

  // console.log('Finish');
  return { success: true, logs };
};

export default {};
