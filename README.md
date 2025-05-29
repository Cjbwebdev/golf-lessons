# ⛳ Golfing Lesson Marketplace App

A full-stack web application where instructors can offer golf lessons and students can book lessons, rate instructors, and pay online — powered by Firebase.

---

## 📌 Features

### For Instructors:
- Sign up and create a profile
- Add 45-minute availability slots
- Set lesson fee per slot
- Receive payments securely (12.5% commission taken automatically)
- View student ratings and comments on their profile

### For Students:
- Sign up and search for nearby instructors by postcode or location
- Browse instructor profiles with ratings and availability
- Book and pay for lessons securely
- Leave reviews and rate instructors after lessons

---

## 🚀 Tech Stack

- **Frontend:** React / Vue / Angular (your choice)
- **Backend:** Firebase Cloud Functions
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Payments:** Stripe (via Firebase Extensions or custom functions)
- **Geolocation Search:** GeoFirestore
- **Hosting:** Firebase Hosting

---

## 🔧 Firebase Modules Used

| Module              | Usage                                         |
|---------------------|-----------------------------------------------|
| Firebase Auth       | Secure sign-in/sign-up                        |
| Firestore           | Store users, bookings, ratings, availability |
| Firebase Hosting    | Serve frontend web app                        |
| Cloud Functions     | Handle payments, commissions, rating updates |
| Stripe Integration  | Accept payments & automate payouts           |

---

## 📁 Project Structure

/your-app
/src
/components
/pages
/services (API calls to Firebase)
/functions (Cloud Functions)
/public
firebase.json
firestore.rules

yaml
Copy
Edit

---

## 📦 Firestore Collections Overview

```json
Users: {
  id,
  role: "instructor" | "student",
  name,
  email,
  ...
}

Instructors: {
  userId,
  location: GeoPoint,
  availability: [
    {
      date,
      time,
      isBooked: false
    }
  ],
  fee,
  reviews: [subcollection]
}

Bookings: {
  instructorId,
  studentId,
  date,
  time,
  amount,
  paymentStatus,
  ratingGiven: false
}

Reviews (subcollection under Instructors): {
  studentId,
  rating,
  comment,
  timestamp
}
💳 Payments & Commission Logic
Payments are processed using Stripe

Commission of 12.5% is deducted automatically via Cloud Functions

Instructors receive 87.5% of the lesson fee

🔍 Search Features
Location-based search using GeoFirestore

Filter by rating, availability, and price

🛠️ Setup Instructions
Clone the repo:

bash
Copy
Edit
git clone https://github.com/yourusername/golf-lesson-app.git
cd golf-lesson-app
Install dependencies:

bash
Copy
Edit
npm install
Setup Firebase:

Initialize Firebase

Enable Firestore, Auth, and Hosting

Deploy Cloud Functions

Configure Stripe and add API keys to environment variables

🧪 Future Improvements
Push notifications for upcoming lessons

Calendar sync for instructors

Group lessons support

AI-based instructor recommendation

📄 License
MIT License © 2025 [Your Name or Company]
