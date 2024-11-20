## Spis treści
- [About](#about)
- [Funkcjonalności](#funkcjonalności)
- [Technologie](#technologie)
- [Screeny](#screeny)
- [Instalacja](#instalacja)

## About  
Aplikacja mobilna, która umożliwia skanowanie roślin za pomocą aparatu, identyfikację gatunku przy użyciu zewnętrznego API, z możliwością dodawania ich do spersonalizowanej kolekcji oraz tworzenie notatek dla konkretnych roślin. Aplikacja obsługuje rejestrację i logowanie użytkowników za pomocą Firebase Authentication, a dane kolekcji są przechowywane w Firebase Database.

## Funkcjonalności  
- 📸 **Robienie zdjęć i wybieranie ich z galerii**.  
- 🌿 **Rozpoznawanie rośliny ze zdjęcia** za pomocą API Plant.ID.  
- 🌱 **Dodawanie rozpoznanych roślin do swojej kolekcji**.  
- 📂 **Zakładka My Plants** z listą wszystkich roślin użytkownika. Dane są zapisywane w Firebase Database:
  - 📖 **Pobieranie szczegółowych informacji** o wybranych roślinach z `json-server`.  
  - 📝 **Możliwość dodania notatki** do każdej rośliny w kolekcji.
  - **Możliwość sprawdzenia natężenia światła** sprawdzenia czy dana roślina jest dobrze nasłoneczniona w danym miejscu np. w domu na parapecie (sensor)
- 🔧 **Zakładka Account**:  
  - Wylogowanie.  
  - Zmiana hasła.  
  - Przełączanie między trybem jasnym i ciemnym. 


## Technologie  
- **React Native (Expo)**: główny framework aplikacji.  
- **NativeBase**: komponenty UI zoptymalizowane dla React Native.  
- **Firebase Auth**: obsługa logowania i rejestracji użytkowników.  
- **Firebase Database**: przechowywanie listy roślin i notatek każdego użytkownika.  
- **Plant.ID API**: rozpoznawanie roślin na podstawie zdjęć.  
- **Json-server**: dostarcza szczegółowe informacje o wybranych roślinach.  

## Screeny  
<div style="display: flex; justify-content: space-between;">
  <img src="/screens/login.png" alt="Logowanie" width="30%" />
  <img src="/screens/authorized.png" alt="Authorized" width="30%" />
  <img src="/screens/forgot.png" alt="Forgot" width="30%" />
</div>
<div style="display: flex; justify-content: space-between;">
  <img src="/screens/home.png" alt="Home" width="30%" />
  <img src="/screens/plant_recognized.png" alt="Plant_recognized" width="30%" />
  <img src="/screens/plants_list.png" alt="Plants_list" width="30%" />
</div>
<div style="display: flex; justify-content: space-between;">
  <img src="/screens/plant_info.png" alt="Plant_info" width="30%" />
  <img src="/screens/luxometer.png" alt="Luxometer" width="30%" />
  <img src="/screens/account.png" alt="Account" width="30%" />
</div>
<div style="display: flex; justify-content: space-between;">
  <img src="/screens/account_change_password.png" alt="Account_change_password" width="30%" />
  <img src="/screens/account_change_password_2.png" alt="Account_change_password_2" width="30%" />
  <img src="/screens/luxometer_2.png" alt="Luxometer_2" width="30%" />
  <img src="/screens/plants_list_2.png" alt="Plants_list_2" width="30%" />
</div>

## Instalacja  

1. **Sklonuj repozytorium**:  
   ```bash
   git clone https://github.com/twoje-konto/zaplikacja.git
2. **Zainstaluj zależności**:
   ```bash
   npm install
3.  **Skonfiguruj Firebase**:
- Utwórz projekt w Firebase.
- Włącz Authentication i Database
  
4. **Skonfiguruj klucze API**:
- W pliku .env dodaj swój klucz API z Plant.ID i FIREBASE:
  ```bash
  PLANT_API_KEY=klucz-api
  FIREBASE_API_KEY=klucz-api
  
5. **Uruchom aplikację**:
   ```bash
   expo start
