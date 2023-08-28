## Project Background

The idea is to build a GPT based chatbot using the [OpenAI API](https://platform.openai.com/docs/introduction).
The views template is built from a figma design provided by Distributed.

Users can send prompts to the AI model and get a response in the chat area.

I have used NodeJs for this project, with handlebarsJs for the client side templating. For styling, I have used tailwind with a few custom css lines as seen inside the 'index.hbs' file in the 'views' directory.


### Project setup
1) After extracting the files and folders, open a new terminal in the root directory (**OPENAI-SMART-TEXT-GENERATOR** folder).

2) Run the following commands:
    ``` npm install ```

3) Create a .env file by running the following command
    ``` touch .env ```
    or
    ``` type nul > .env ```
    or
    ``` New-Item -ItemType File -Name .env ```
    depending on your terminal settings

4) Open the .env file you just created and enter as below:
    ```
    openai_key=
    secret_key=

    ```

5) Assign your openAI API key to the first variable openai_key after the equal to sign (no whitespcae)

6) Repeat step 5 for the secret_key variable. The file should look something like below:

    openai_key=sk-randomalphanumericcharatersfromyouropenaiaccount
    secret_key=yoursecretstringforsigningandverifyingtokens
    
I have used nodemon to watch for updates to the codebase and auto-restart the server instead of just exiting and restarting manually.
If you need to start manually instead, you can navigate to *package.json* and edit the start scripts as below (line: 7)
```
    "start": "node app.js"
 ```

7) Run the folloing command:
    ``` npm start ```

 There is no database model I am using, instead I have set up the project to use json files using node filesystem (fs) to create and read list items as a placeholder database. This can also be edited manually as well.

 This is not good security, but as it was not included in the original specifications, I thought I couldjust do something additional, just for the UX.

 The reason I decided to do this was to go above and beyond, especially for authentication (login and signup). I also created an additional screen for reseting passwords, in case such actions may be needed on the client side, instead of coming back to the codebase or the json file. Design is implemented similarly to other authentication screens.


### Potential bugs

I have found I am experiencing the issue described [here](https://github.com/openai/openai-node/issues/148) sometimes, and sometimes it responds okay. You can try refreshing the browser and resending the prompt as I have done during development, otherwise I am stumped as to how best to approach this problem, as it is a problem with openAI. Still looking into it, but for the sake of timelines and delivery, this solution seems to work. You may get a 'connect ETIMEDOUT 104.18.6.192:443' or a 'server responded with status 503' (server overload) error with some prompts.

Chat history is only available on bigger resolutions (768px and above). I didn't yet add an icon on smaller screens to toggle the menu due to time constraints.

I have also not made the site fully responsive, only using default classes, again, due to time constraints.



### Further reading

I built everything from scratch as it was also an opportunity to learn things I have not worked with before.
It was my first time working with both handlebars and tailwind, not to mention openAI API.
My background has been mostly ejs and bootstrap respectively.
I have learnt a lot building this project, I already feel like a pro with express-handlebars.


I have added comments where needed, but I have also written self documenting code, especially with variable naming for easier understanding.