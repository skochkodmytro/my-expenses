# Expense Tracker App

This is a **React Native CLI** application that allows users to **track and manage their expenses and incomings**. It provides a simple and intuitive interface to add, view, and categorize financial transactions.

All user data is stored and managed using **Firebase Firestore**, ensuring secure and real-time data syncing across devices.

---

## Features

- Add and manage expenses and income entries
- View a list of all transactions
- Real-time data syncing using Firebase Firestore
- Built with React Native CLI

---

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/skochkodmytro/my-expenses.git
cd my-expenses
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install iOS pods (only if you're using macOS for iOS development)

```bash
cd ios
pod install
cd ..
```

### 4. Run the app

#### For Android:

```bash
npx react-native run-android
```

#### For iOS:

```bash
npx react-native run-ios
```

---

## Firebase Setup

Make sure to add your Firebase configuration files to the project:

- `google-services.json` → place in `android/app/`
- `GoogleService-Info.plist` → place in `ios/`

These files are required for Firebase Firestore to work properly in your app.

---

## Requirements

- Node.js
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS dependencies)
