# Developer Guide

## Request Validation

1. state:landing : URL - cloudaz.com/landing, controller: mainController
2. Validate Request (mainMethods) - Check url parameter(signup token):
    - if parameter exists :
      - call validateToken(): check temporaryToken collection for matching token
        1. if matching temporary token record found:
           - check for matching sourceCustomerId records in customerCollection
             1. if sourceCustomerID record/s exist:  check for subscription status all of records
                - _case UNSUBSCRIBE_SUCCESS for all records_:
                  - return temporary customer record from temporaryToken collection (This will let the same customer create a new record using different emailID) --> this will ensure that only one record is active i.e. one record with subscription status as 'subscribe_success'
                  - set sourceCustomer data in mainController from the above returned value
                  - redirect to state signup with sourceCustomer data
                - _case one UNSUBSCRIBE_PENDING && rest records as UNSUBSCRIBE_SUCCESS or no other records found_:
                  - pop-up: "your account is under unsubscription process, please come back later for new signup"
                - _case one SUBSCRIBE_SUCCESS_ :
                  - get the email associated with this record from customerCollection
                  - show profile page (currently, one HTML page showing that the customer is already signed up with **this_email**)   
                - _case default for any record_:
                  - pop-up: error with subscription, redirect to contact support
              2. else:
                - return temporary customer record from temporaryToken collection (to create a new customer record)
                - redirect to state signup with sourceCustomer data
        2. else:
            - pop-up message : Invalid Request --> redirect to cloudaz home page
    - else :
      - set sourceCustomer data --> null
      - redirect to state signup with sourceCustomer data

## Signup Process 

state: signup
  - fill the form
    - check all the mandatory fields
    - if email exists - normal flow continues (error display)

## Backgroud process

### Events and Actions

1. **Event-1:** Signup registration form received

    **Action:**
    - insert record with sourceCustomer Details into customers collection
2. **Event-2 :** /awssignup API called

   **Action :** 
   - insert to temporaryToken Collection
   - default subscription status : "NO_SUBSCRIPTION"
3. **Event-3 :** /updateSuscriptionStatus API called

   **Action :** 
   - search for record by sourceCutomerId in temporaryToken collection and update subscription status if exists 
   - search for record by sourceCutomerId in customers collection and update subscription status of all the records (use {multi: true}) if exists 
4. **Event-4 :** /instances API called

   **Action :** 
   - return all simpleInstance s
5. **Event-5 :** /instances/{instanceId} API called
    - Get request
      **Action :** 
      - return detailedInstance for {instanceId}
    - Post request
      **Action**
      - updateIntanceDetails
   
6. **Event-6 :** /customers/ API called

   **Action :** 
   - return all simpleInstance s
7. **Event-7 :** /customers/{customerId} API called

   **Action :** 
   - return detailedCustomer for {customerId}
   - search based on customerId only is possible and not sourceCustomerId
8. **Event-8 :** /instanceStatusUpdate/{instanceid} API called

   **Action :** 
   - update instance provision status for {intanceId}
9. **Event-9 :** /instanceStatusUpdate/{instanceid} API called

   **Action :** 
   - update instance provision status for {intanceId}
10. **Event-10 :** state landing --> no signupToken

    **Action :** 
      - redirect to home

11. **Event-11 :** state landing --> invalid signupToken

    **Action :** 
      - pop-up "invalid token" --> no redirect, background click disabled

12. **Event-12 :** state landing --> existing customer record
    - pending subscription
    **Action :** 
      - pop-up "pending subscription" --> no redirect, background click disabled
    - pending unsubscription
    **Action :** 
      - pop-up "pending unsubscription" --> no redirect, background click disabled
    - other statuses
    **Action :** 
      - pop-up "invalid subscription" --> no redirect, background click disabled
    - all records with unsubscribe_success status
    **Action :** 
      - pop-up "register with different email" --> redirect to signup


**backgroud services**
1. sns messgae could arrive anytime
2. workflowhelper listener to update notification status based on change in provision status

**Few TIPS**


**To Do**
1. add i18n integration
2. implement TDD
3. provide subscription status also as api response



