Job Portal with Resume Parsing
------------------------------

This project is a job portal application designed to streamline the recruitment process by incorporating resume parsing capabilities. The application allows users to upload their resumes, which are then parsed to extract relevant information, facilitating easier matching with job listings.

Features
--------

- **User Authentication**: Users can sign up and log in to the application securely.
- **Resume Parsing**: Resumes uploaded by users are parsed to extract key information such as education, work experience, skills, etc.
- **Job Listings**: Employers can post job listings, including details such as job title, description, required skills, etc.
- **Matching Algorithm**: Resumes are matched with relevant job listings based on extracted information.
- **User Dashboard**: Users have access to a personalized dashboard where they can manage their profile, view matched job listings, etc.
- **Admin Panel**: Administrators have access to an admin panel where they can manage users, job listings, and monitor system activity.
- **Responsive Design**: The application is designed to be responsive and work seamlessly across different devices and screen sizes.

Technologies Used
-----------------

- **Frontend**:
  - React
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Python (for resume parsing using OpenAI API and PyPDF2)
  
- **Database**:
  - MongoDB

Setup Instructions
------------------

1. **Clone the Repository**: 
git clone https://github.com/DeepakVegda/IT090-91
2. **Install Dependencies**:
- Navigate to the frontend directory:
  ```
  cd job-portal/frontend
  npm install
  ```
- Navigate to the backend directory:
  ```
  cd ../backend
  npm install
  ```
- Navigate to the pythonbackend directory:
  ```
  cd pythonbackend
  pip install -r requirements.txt
  ```





3. **Start the Application**:
- Start the frontend:
  ```
  cd ../frontend
  npm start
  ```
- Start the backend:
  ```
  cd ../backend
  npm start
  ```

4. **Access the Application**:
- Once both frontend and backend servers are running, access the application at `http://localhost:3000` in your web browser.

## Contributors

Special thanks to the following contributors for their valuable contributions to this project:

- **Brij Patel**
- **Danish Patel**


Acknowledgements
----------------

Special thanks to Professor Deepak C. Vegada for his guidance and support throughout the development of this project. His expertise and mentorship have been invaluable in shaping our understanding and implementation of the concepts involved. We are grateful for his dedication and commitment to our learning journey.

