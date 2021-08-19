# E-Medic

The main objective is to provide a user friendly web based platform for the end-users which integrates both E-Pharmacy and E-Consulting. E-Pharmacy should involve e-commerce like platform with an OCR based text extraction for extracting data from prescriptions which can be validated by a staff for confirming the order. E-Consultancy should facilitate online based advisory consulting for the patient to get an idea about the severity of his/her health condition based on the advice which the doctor generates.

## Functional Requirements

1. <b>Registration and Login Verification</b><br/>
   This feature of the system allows creation of an account based on the type of user i.e., customer, doctor or staff. This feature of the system is also used to verify the login details of the user. The user enters the login details, i.e. the username and the corresponding password. The system should accept the username and the password, and should check if the entered details match the required format.

2. <b>Order Processing </b><br/>
   This feature of the system makes it possible for the E-Pharmacy customer to select medicines and add it to the cart followed by uploading of the prescription, entering deliver address using Map API based approach and placing the order which gets validated by the staff based on the uploaded prescription thus enabling the customer to download computer generated bill. It also gives an option for the staff to flag a medicine if it is not present in stock.

3. <b>Prescription Processing </b><br/>
   The prescription which the customer uploads must get scanned through the OCR engine and hence get pushed to the database and hence the digitized version along with the original image needs to be available for the staff to validate the order.

4. <b>E-Consultancy communication platform</b><br/>
   This feature should possess two different routes based on the type of user (doctor or patient). On the patients end, he/she enters necessary details along with the symptoms which get displayed as cards on the doctor’s dashboard. Doctor can check individual queries and advise every patient based on his/her symptoms which the patient can access as when doctor generates advice.

## Database Tables for MySQL

- Customer: CID, Email, phone, password, name, date.
- Staff: SID, name, date, email, phone, password, date, skillname.
- Delivery: DID, address.
- Bill: BNO.
- Medicine: MID, MNAME, price, Prescriptioneed, isavail.
- Order: OID, ISVAL

## Steps to install

1. Install NPM and node.js : Follow this link to setup https://phoenixnap.com/kb/install-node-js-npm-on-windows

2. After installing npm, install nodemon to run the backend service : type `npm install -g nodemon`

3. Clone the Repo: type `git clone https://github.com/yatinsatija/E-Medic.git`

4. Go to the directory where the project if cloned.

5. Do `npm install` for both frontend and backend folder separately.

6. Enter the frotend folder type `npm start` , it will run the frontend part on localhost.

7. Open separate terminal console and enter in the backend folder ,then type `nodemon index.js` ,this will run the backend service.

8. Now you can go the localhost url and test the project.

## Software Requirements

The software tools used for designing and developing the application includes:<br/>

- React.Js for frontend design and state management
- Express Js for designing backend
- Tesseract CDN which is an open source OCR engine
- MySQL for RDBMS
- Firebase which is a BaaS for NoSQL database
- Material UI for beautifying UI

## Result Snippets

1. EPHARMACY PAGE
   ![alt text](https://github.com/yatinsatija/E-Medic/blob/main/ResultSnippets/epharmacy.png)

2. ECONSULTANCY PAGE
   ![alt text](https://github.com/yatinsatija/E-Medic/blob/main/ResultSnippets/econsultancy.png)

3. CHECKOUT PAGE
   ![alt text](https://github.com/yatinsatija/E-Medic/blob/main/ResultSnippets/checkout.png)

4. MAPS API
   ![alt text](https://github.com/yatinsatija/E-Medic/blob/main/ResultSnippets/tomtomMapsAPI.png)
