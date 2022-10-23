# AWS Marketplace SAAS Signup Integration

## Signup Process

Sequence:

1. User click "subscribe" from AWS marketplace on the product page.
2. External (apigateway, lambda) process call api `awssignup` to get a `signuptoken`.
3. User got redirected by apigateway to `https://<signup_host>/signup/<signuptoken>`.
    - 3a. User finishes signup form
    - 3b. Receved AWS signup udpate by lambda, then it call api `subscriptionudpate`.
        - "subscribe-pending"
        - "subscribe-success"
        - "subscribe-fail"
        - "unsubscribe-pending"
        - "unsubscribe-success"
        - "unsubscribe-fail"
4. Signup app request for aporoval.
5. Approved.
6. When external process call api `instances` to get list of instances:
    - A new `simpleInstance` having property `status.provisionStatus` with value `INSTANCE_PROVISIONED` will be in the result.
7. External process (lambda) creates the instance and call api `instanceStatusUpdate` with `provisionStatus` as value `INSTANCE_CREATION_START`.
8. External process (lambda) call api `/instances/{instanceId}` with body `instanceDetails` with necessary data.
9. External process (lambda) creates the instance and call api `instanceStatusUpdate` with `provisionStatus` as value `INSTANCE_CREATION_END` or `INSTANCE_CREATION_FAILED`.
