<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Khoeos/Paradox-mod-localisation-converter">
    <img src="github/app.png" alt="Logo">
  </a>

  <p align="center">
    A simple app to generate localisation for your language, based on english version for Paradox's Games
    <br />
    <a href="https://github.com/khoeos/Paradox-mod-language-converter/releases"><strong>Download App »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/khoeos/Paradox-mod-language-converter">Explore the docs »</a>
    <br />
    <br />
    <a href="https://github.com/khoeos/Paradox-mod-language-converter/issues">Report Bug</a>
    ·
    <a href="https://github.com/khoeos/Paradox-mod-language-converter/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#how-it-work">How It Work</a>
    </li>
    <li>
      <a href="#debug-mode-and-logs">Debug mod and logs</a>
    </li>
    <li><a href="#todo">Todo</a></li>
    <li><a href="#other-paradox-games">Other Paradox Games</a></li>
    <li><a href="#stacks">Stacks</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
As non english player, one thing that annoys me in paradox game, it's the management of translations inside mods. If a modder take the choice to create localisation files to have translation in multiple languages, if there is no files for your language, inside the game you'll only see translation tag, not even the english (ore any languages) texts.

Even if you're good at english, it's a comfort to play with our native language for most of the content with only some untranslated mods in english.

So to help all the players like me, and the modders who want to be more inclusive easily, i made this app which do the job of generate localisation files for any selected language from english files (from other languages later).

The first version was a simple script not user friendly at all, so i decided to upgrade it and made a user interface to do that.

**At this time, the app is mainly tested with stellaris, i've use it in eu4 and ck3, but it theorically work with all registered paradox game, see more lower**

<!-- HOW IT WORK -->
## How it Work
*If you know french, everything is commented, the translation will come later. Every variables and functions are in english though*


<!-- DEBUG MODE AND LOGS -->
## Debug mode and Logs

### Debug mode

#### Without debug mode

#### With debug mode

<!-- OTHER PARADOX GAMES -->
## Other paradox games
Paradox's game mods use same type of files and folders for the localisation files, the difference is mainly around the name of theses files/folders (localization or localisation). So like I said, this app is mainly tested with stellaris and i've use it in ck3 and eu4, but as the same logic applies, i've done the specificities of the other games. But in some specific cases it may not work.

As the majority of paradox game manage the translation in the same way (CK3, EU4, Hoi4...) it'll normally work with them (hence the choice of the name), simply enter the mod folder path. 
As the script came with multiple filter to select the good file, and never overwrite existing files(exept with specific options), it'll normally not make problems, and even if it's the case, as everything is locally, you'll juste have to re-install the game.

<!-- Stacks -->
## Stacks

This app was made from the [Vite electron starter by Maxstue](https://github.com/maxstue/vite-reactts-electron-starter) 
Using [Electron](), [React]() and [tailwind](https://tailwindcss.com/) 
The script was first pure javascript, and then converted to [Typescript](), as i'm a beginner with it i may be some bad code currently (we don't talk about :any)
The script use [Directory-tree](https://www.npmjs.com/package/directory-tree).

### Installation
Verify you have [node and npm](https://nodejs.org/en/download/) installed with the actual LTS release
1. Clone the repository
2. Make `npm install`
3. Launch with `npm start`

You need to have yarn installed
  
### How to Build

<!-- TODO -->
## TODO

- Manage incomplete files (missing translation tag for example)

See the [open issues](https://github.com/Khoeos/Paradox-mod-localisation-converter/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Don't hesitate to pm me on discord to talk about the app. You can find my tag lower.



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Discord : Khoéos#9117

Project Link: [https://github.com/khoeos/Paradox-mod-language-converter](https://github.com/khoeos/Paradox-mod-language-converter)






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Khoeos/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/Khoeos/Paradox-mod-language-converter/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Khoeos/repo.svg?style=for-the-badge
[forks-url]: https://github.com/Khoeos/Paradox-mod-language-converter/network/members
[stars-shield]: https://img.shields.io/github/stars/Khoeos/repo.svg?style=for-the-badge
[stars-url]: https://github.com/Khoeos/Paradox-mod-language-converter/stargazers
[issues-shield]: https://img.shields.io/github/issues/Khoeos/repo.svg?style=for-the-badge
[issues-url]: https://github.com/Khoeos/Paradox-mod-language-converter/issues
[license-shield]: https://img.shields.io/github/license/Khoeos/repo.svg?style=for-the-badge
[license-url]: https://github.com/Khoeos/Paradox-mod-language-converter/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/Khoeos
