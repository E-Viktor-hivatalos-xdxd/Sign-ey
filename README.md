![Logo](/sign-ey.png)

# Sign-ey

A Sign-ey egy iskolai beléptető rendszer mely megkönnyebíti a diákok/tanárok belépését és kilépését nyomon követni. Kézbeeső dizájnjával könnyen kezelhető portások és igazgatók számára.

## Dokumentáció

[Dokumentáció](/dokumentumok/dokumentacio.pdf)

[Használati útmutató](/dokumentumok/hasznalati_utmutato.pdf)

## Telepítési követelmények

- [**Xampp**](https://www.apachefriends.org/hu/download.html)
- [**Node.js**](https://nodejs.org/en/download)

**Telepítését ezzel a folyamattal kezdhetjük el**


Tölsd le a forráskódot:

```bash
git clone https://github.com/E-Viktor-hivatalos-xdxd/Sign-ey.git
cd sign-ey
```


**Importáld be MySQL adatbázisba az alábbi adatok.sql fájlt**

Telepítsd a szükséges szoftverek aztán indítsd el a szervereket:

```bash
cd backend
npm install
node index.js
```

```bash
cd frontend
npm install
npm run build
npm run start
```
Sikeres telepítés után a szoftver elérhető lesz a http://127.0.0.1:3000 címen!

## A belépéshez használható adatok: 

> email: "admin@admin"

> jelszó: "admin"