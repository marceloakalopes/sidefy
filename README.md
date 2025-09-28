1. User must allow the app to acces geolocation and optionally camera.
2. Allow user to input two SKUs (either by QR code reading or manually typing)
3. Fetch the products from Best Buy API (SKU, name, price, image, availability in the closest store, customer reviews, protection plans.). NOTE: ideally for sellers, getting margins and a protection plan discounts strategies would be nice. Or bundling discounts for mobile or geeksquad department. 
4. Fetch suggested products related to the two products from Best Buy API
5. Feed a LLM with the products and the suggested products and the user's input and the user's location to compare the products and suggest the best option.
6. Display the results to the user.
7. Allow the user to click on one of the suggestions to continue the conversation and further explore another product.
8. Display the result of the selected product to the user.
9. Show more suggestions to the user. This cycle will continue until the user is satisfied with the result.