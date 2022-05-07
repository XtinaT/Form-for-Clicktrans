# Form-for-Clicktrans

This form:
* interacts with users;
* validates and collects data;
* sends collected data to server after submission

### Validation
*******
Client-side validation is made with the help of:
* Build-in form validation: 
  + Attribute 'required' for fields that need to be filled in;
  + Attribute 'max-length' specifies the maximum number of characters allowed in the <textarea> element.
* JavaScript validation:
  + prevents sending invalid data to server;
  + listens to fields value change;
  + dynamically shows messages to user describing validation constrains;
  + implemented with a help of Event Listeners and the function validateFormInfo;

  *Validation is made according to the task description. Exception: value of the 'Price netto EUR' field is also required not to be 0 or negative.*

  ### Submit 
  *******
  After the successful validation, the user is allowed to submit the form. Submission calls the function sendAllowded, that converts user's data into JSON. Then data are passed to the server via POST method using AJAX.


  If the request succeeds, the user can see a congratulation message instead of a form.
  If the request fails, the user can see an error message that suggests trying one again.




