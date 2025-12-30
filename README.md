# Edge AI–Powered Early Burnout, Fatigue & Dehydration Prediction System

## 🎯 Vision

A privacy-first, offline-capable **Edge AI–Powered Early Burnout, Fatigue & Dehydration Prediction System** for students, professionals, and frontline workers. The system addresses prolonged cognitive load, irregular routines, dehydration, and chronic stress by predicting early signs of burnout, fatigue, and dehydration **before symptoms become critical**, enabling proactive self-care and crisis prevention rather than reactive responses.

This system represents a transformation from passive health monitoring to **proactive, intelligent protection**, using Edge AI and TinyML to empower users to act early, safely, and privately.

## 📝 Project Overview

This application serves as a comprehensive companion for the WellGuard AIoT wearable device. It provides a user-friendly interface for individuals to monitor their well-being, gain AI-driven insights, and access supportive tools. The key features include:

*   **Personalized Onboarding:** Captures essential user details like gender and date of birth to tailor the app experience.
*   **Real-Time Health Dashboard:** Displays live physiological data from the wearable, such as heart rate, skin temperature, and SpO₂.
*   **AI-Powered Health Assessment:** Uses Genkit and Google's Gemini models to analyze sensor data and predict risks for fatigue, dehydration, burnout, and mental overload, offering actionable recommendations.
*   **Mental Wellness Tools:** Includes a mental wellness check-in (GAD-7 assessment), an AI Coach for emotional support, and a wellness center with breathing exercises and calming content.
*   **Women's Health Module:** A dedicated dashboard for female users to track their menstrual cycle, log symptoms, and receive phase-specific insights.
*   **Community Support:** A privacy-conscious peer-to-peer feed where users can anonymously share experiences and find solidarity.
*   **Doctor-Patient Connectivity:** Features a dedicated dashboard for healthcare professionals to monitor patient data and receive emergency alerts.

## 🚀 Core Principles

*   **Proactive Prediction:** Predict fatigue, burnout, and dehydration 15-30 minutes in advance.
*   **Privacy-First:** All data processing occurs on-device using Edge AI. No raw personal data is sent to the cloud.
*   **Offline-Capable:** The system is fully functional without an internet connection.
*   **Low-Latency & Energy-Efficient:** Optimized for continuous use on wearable devices.

## 🌊 Project Flow

The user journey is designed to be intuitive and supportive, guiding the user from initial setup to daily wellness management.

1.  **Onboarding:** The user creates an account by providing their name, email, password, date of birth, and gender. This information is used to personalize the app experience.
2.  **Dashboard:** After logging in, the user lands on the main dashboard, which shows real-time vitals from their wearable device and a summary of their AI-driven health assessment.
3.  **Wellness Check-in:** The user can take a GAD-7 assessment to check their anxiety levels and receive recommendations based on their score.
4.  **Specialized Dashboards:**
    *   **Women's Health:** If the user is female, they can access a dedicated dashboard to track their menstrual cycle, log symptoms, and view cycle-specific insights.
    *   **AI Coach:** The user can chat with an AI-powered coach for emotional support and guidance.
    *   **Community:** Users can opt into a public support mode to anonymously share experiences and connect with peers.
5.  **Settings & Privacy:** The user can manage application settings, control data privacy (like enabling/disabling community sharing), and log out from the settings page.
6.  **Doctor View:** A separate portal allows authorized doctors to view patient data, monitor for critical alerts, and make notes.

## 🛠️ System Architecture

A multi-layer architecture for a wearable device integrated with this companion mobile application.

### 1. Data Acquisition Layer (Wearable)

Continuously collects physiological, behavioral, and contextual data.

*   **Physiological Signals:**
    *   Heart Rate, HRV, SpO₂ (MAX30102)
    *   Skin Temperature (NTC/DS18B20)
    *   Skin Conductance/EDA (GSR Sensor)
    *   Breathing Rate
*   **Behavioral Signals:**
    *   Movement, Activity Duration & Intensity, Rest-Activity Imbalance (MPU6050)
    *   Posture & Restlessness
*   **Environmental Inputs (Optional):**
    *   Ambient Light (BH1750)
    *   Noise, Temperature, Humidity, CO₂

### 2. On-Device Processing & AI Layer (Edge AI/TinyML)

Lightweight ML models deployed on embedded platforms (e.g., ESP32, Arduino Nano, Raspberry Pi Pico) perform on-device analysis.

*   **Short-Term Fatigue Prediction:** Estimates fatigue levels 15–30 minutes ahead.
*   **Dehydration Risk Estimation:** Assesses risk based on physiological and activity data.
*   **Mental Overload Trend Detection:** Analyzes patterns of cognitive stress.
*   **Burnout Probability Scoring:** Classifies user state into `Normal`, `Mild Risk`, `High Risk`, or `Critical Burnout Trajectory`.

### 3. Predictive Alert & Intervention Layer

Delivers context-aware, adaptive, and preventive notifications.

*   **Context-Aware Alerts:** Notifications for hydration, breaks, or mindfulness are triggered based on user profile (student, professional), activity, time of day, and workload.
*   **Alert Control Logic:** Suppresses repeated or low-confidence alerts to avoid "alert fatigue."
*   **Gentle Interventions:** Provides gentle vibrations or audio cues, on-screen guidance for breathing, and environmental recommendations (e.g., adjust lighting).
*   **Critical Safety Mode:** With user consent, can notify a supervisor or caregiver with aggregated risk information only.

### 4. Companion Mobile App (This Application)

Serves as the user's interface for visualization, configuration, and long-term trend analysis.

*   **Dashboard:** Displays real-time status, risk scores, and trends.
*   **Data Visualization:** Shows historical data for activity, stress, and physiological metrics.
*   **Alert Configuration:** Allows users to customize alert sensitivity and types.
*   **Offline Sync:** Syncs data stored on the wearable's flash memory when connected.

## 🔁 System Workflow

1.  **Continuous Data Collection:** Sensors on the wearable gather data.
2.  **On-Device Preprocessing:** Data is cleaned and features are extracted locally.
3.  **TinyML Prediction:** On-device models predict future states (fatigue, dehydration).
4.  **Context-Aware Decision-Making:** The system decides if an alert is necessary based on context.
5.  **Preventive Alert Delivery:** User receives a gentle, actionable notification.
6.  **Adaptive Interventions:** App provides guidance for self-care.
7.  **Anonymized Sync:** Optional, anonymized summary data is synced to the cloud for backup.

## ✅ Core Benefits

*   **Prevent Burnout & Fatigue:** Act before exhaustion becomes a problem.
*   **Reduce Accident Risk:** Enhance safety in high-stakes environments.
*   **Support Mental Health with Privacy:** No stigma, no data leaks.
*   **Encourage Timely Self-Care:** Empowers users with proactive information.
*   **Scalable Deployment:** Suitable for schools, offices, factories, and hospitals.
