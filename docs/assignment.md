Transavia front-end developer assignment
Thank you for your interest in being a front-end developer at Transavia! Our hiring process
consists of 2 parts. A non-technical part and a technical part. Below we focus on the technical
part only.
Create and present a Next.js application
We will discuss this at the day of your interview.
Don't spend more than 4 hours on this, unless you're having fun and like to show off and/or
want to make it look nice!
Create a Next.js application that contains a form with three input fields:
• Origin
• Destination
• Departure date
When the user submits the form, display the available matching flights on the same page. Use
the json responses we provide (more information below).
Requirements:
• It should be a Next.js app
• It should be using TypeScript
• It should have unit tests (covering rendering and logic)
Some things to note:
• We like performant and clean code;
• Feel free to use an existing styling library;
• A bit of Transavia styling is nice, but not required
Responses provided by us:

1. airports.json
2. flights-from-AMS.json
   flights-from-AMS.json is a response with a limited scope:
   • from origin/departure airport AMS only;
   • with available flights in the time range of: 10-11-2022 – 30-11-2022
   • the total price to show is identified by totalPriceAllPassengers
   airports.json is a list of all existing airports. You could use this as an easier way to find airport
   codes that might be in the flights-from-AMS response. Also, it can be used to display the results
   in a friendly way (showing airport names instead of airport codes)
