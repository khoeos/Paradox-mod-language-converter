// import fs from 'fs';
import dirTree from 'directory-tree';
import { gameKey } from './variables';
import { requestInterface } from './interfaces';

export const translate = async (request: requestInterface) => {
  console.log(request);
  await dirTree(request.path, { extensions: /\.yml$/ }, (item, path): any => {
    console.log(item);
    // Vérifie si dans le chemin du fichier, il y a le dossier localization
    // Si non, passe le fichier
    if (path.split('\\').indexOf(gameKey[request.game as keyof typeof gameKey]) === -1) {
      console.log('1');
      return null;
    }

    // Ignore les fichiers qui ne sont pas dans un sous dossier english
    // Sauf ceux qui sont à la racine du dossier localization
    if (
      path.split('\\').indexOf(request.sourceLanguage ?? 'english') === -1 &&
      path.split('\\').indexOf(gameKey[request.game as keyof typeof gameKey]) + 2 !== path.split('\\').length
    ) {
      console.log('2');
      return null;
    }

    // Si le chemin contient le dossier replace, ignore ce fichier
    // (à gérer plus tard car la nomenclature est différente)
    if (path.split('\\').indexOf('replace') !== -1) {
      console.log('3');
      return null;
    }
    console.log(path);
    console.log('inside');
    return 'test';
  });
  console.log('outside');
};

export default {};
