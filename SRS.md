# Software Requirements Specification (SRS)
## Vocabulary Learning Application

**Version:** 1.4  
**Date:** June 14, 2026  
**Status:** Draft  

---

### 1. Introduction

#### 1.1 Purpose
The purpose of this document is to specify the functional and non-functional requirements for a Vocabulary Learning Application designed to help users memorize English vocabulary through interactive exercises and sentence-based learning.

#### 1.2 Scope
The application is a web-based platform where users can manage a vocabulary list categorized into 18 Lessons (each with a unique theme) and practice words using four distinct exercise types. The system will be built as a monorepo containing both the frontend and a Node.js backend for persistent storage.

#### 1.3 Definitions, Acronyms, and Abbreviations
- **SRS:** Software Requirements Specification.
- **ISO:** International Organization for Standardization.
- **JSON:** JavaScript Object Notation.
- **API:** Application Programming Interface.
- **POS:** Part of Speech (e.g., noun, verb, adjective).

#### 1.4 References
- ISO/IEC/IEEE 29148:2018 Systems and software engineering — Life cycle processes — Requirements engineering.

---

### 2. Overall Description

#### 2.1 Product Perspective
The system is a standalone web application utilizing a client-server architecture. It features a modern web frontend and a Node.js backend API for managing vocabulary data.

#### 2.2 Product Functions
1. **Vocabulary Management:** Admin-only CRUD operations for vocabulary items.
2. **Lesson-based Structure:** Content organized into 18 Lessons, each associated with a specific theme/title.
3. **Dictionary:** Searchable dictionary with translations, parts of speech, and examples.
4. **Data Import/Export:** Admin-only upload and download of vocabulary data in JSON format.
5. **Interactive Exercises:** Four types of learning activities based on the vocabulary list.
6. **Backend Persistence:** Secure storage of vocabulary data using Node.js.

#### 2.3 User Classes and Characteristics
- **Learners:** Individuals looking to improve their English vocabulary through active recall and exercises.
- **Administrators:** Users with exclusive rights to upload, edit, and manage vocabulary data on the backend.

#### 2.4 Operating Environment
- **Web Browser:** Modern browsers (Chrome, Firefox, Safari, Edge).
- **Backend:** Node.js environment.
- **Database:** Relational or NoSQL database for vocabulary storage.

#### 2.5 Design and Implementation Constraints
- **Architecture:** Must be implemented as a Monorepo.
- **Language:** English/Russian interface and content.
- **Backend Framework:** Node.js is mandatory.

---

### 3. System Features

#### 3.1 Vocabulary Data Structure
Each vocabulary item must contain:
- **Lesson Number:** Integer from 1 to 18.
- **Lesson Theme:** String describing the lesson's topic.
- **English Word:** The target word to learn.
- **Russian Translation:** The equivalent word in Russian.
- **Part of Speech:** Grammatical category (e.g., (n.), (v.), (adj.)).
- **English Sentence:** A sample sentence containing a `{{target}}` token where the word should be placed.
- **English Definition:** The meaning of the word explained in English.
- **English Example:** A full example sentence using the word.
- **Russian Example:** The translation of the English example sentence.

#### 3.2 Dictionary Feature
- **REQ-1:** The system shall provide a dictionary view where users can filter words by lesson and theme, and see all associated word details.

#### 3.3 Data Management
- **REQ-2:** Only users with Administrative privileges shall be able to upload vocabulary data via JSON files.
- **REQ-3:** All data modifications must be handled by the Node.js backend with proper authorization.

#### 3.4 Learning Exercises
The system shall provide the following exercise types:

- **TASK-1: Fill-in-the-Blank (Input)**
  - Display an English sentence replacing the `{{target}}` token with an interactive input field.
- **TASK-2: Fill-in-the-Blank (Multiple Choice)**
  - Display an English sentence replacing the `{{target}}` token with a selection component (4 options).
- **TASK-3: Definition Matching (Input)**
  - Display the English definition. User must type the correct English word.
- **TASK-4: Definition Matching (Multiple Choice)**
  - Display the English definition. User must select the correct word from 4 options.

---

### 4. External Interface Requirements

#### 4.1 User Interfaces
- Clean, responsive web design.
- **Lesson Selector Dashboard:** 18 cards displaying Lesson Number and Theme.
- **Dictionary View:** Categorized by lessons.
- **Exercise Interface:** Minimalist and focused environment.
- **Admin Panel:** JSON upload and database overview.

#### 4.2 Software Interfaces
- REST or GraphQL API built with Node.js.

---

### 5. Non-functional Requirements
... (Same as version 1.3)

---

### 6. Appendices

#### 6.1 JSON Schema Example
```json
[
  {
    "lessonNumber": 1,
    "lessonTheme": "Personal Identity",
    "wordEn": "Notion",
    "wordRu": "Понятие",
    "partOfSpeech": "n.",
    "definitionEn": "A conception of or belief about something.",
    "sentenceEn": "The {{target}} that people can be categorized by their astrological signs is often debated.",
    "exampleEn": "The notion that technology solves all problems is a fallacy.",
    "exampleRu": "Представление о том, что технологии решают все проблемы, является заблуждением."
  }
]
```
