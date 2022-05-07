# Form-for-Clicktrans

This form:
* interacts with users;
* validates and collects data;
* sends collected data to server after submission

### Validation
*******
Client-side validation is made with help of:
* Build-in form validation: 
  + Attribute 'required' for fields thah need to be filled in;
  + Attribute 'max-length' specifies the maximum number of characters allowed in the <textarea> element.
* JavaScript validation:
  + prevents sending invalid data to server;
  + listen to fields value change;
  + dynamically shows messages to user describing validation constrains;