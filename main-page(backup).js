function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let content = document.querySelector(".content");
    if (sidebar.style.left === "-250px") { 
        sidebar.style.left = "0px";
        content.style.marginLeft = "250px"; 
    } else {
        sidebar.style.left = "-250px"; 
        content.style.marginLeft = "0px";
    }
    document.getElementById('bar').addEventListener('click', ()=>{
        document.getElementById('bar').style.backgroundColor = 'gold'
    })
  }

  let outBtn = document.getElementById('logout');
  outBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    let confirmOut = confirm('Do you want to logout?');
    if(confirmOut){
        window.history.replaceState(null, null, 'index.html');
        window.location.href = 'index.html';
    }
  });

  document.addEventListener('DOMContentLoaded', function(event) {
    event.preventDefault();
    let promptBtn = document.querySelector('.enter');

    promptBtn.addEventListener('click', function(event) {

        event.preventDefault();
        let input = document.querySelector('.prompt').value;
        let bubble = document.createElement('h3');
        let textNode = document.createTextNode(input);
        bubble.appendChild(textNode);
        const formDataStr = localStorage.getItem('formData');
        const formData = JSON.parse(formDataStr);

        const data = {
            'name': formData.name,
            'password': formData.password,
            'email': formData.email
        }

        const dataName = data['name']
        if(!input){
        }
            let user = dataName;
            let username = document.createElement('h6');
            username.id ='user'
            let newDiv = document.createElement('div');
            newDiv.id ='resDiv';
            let image = document.querySelector('.welcome');
            document.querySelector('.prompt').value;
            username.textContent = user;

            //bubble style
            let x = bubble.style;
            x.maxWidth = '700px';
            x.wordWrap = 'break-word'; 
            x.border = 'none';
            x.fontWeight = 'normal'
            x.fontSize = '16px';
            x.padding = '10px';
            x.lineHeight = '1.8';
            x.textAlign = 'justify'
            
            //div style
            let y = newDiv.style;

            function applyStyles() {
                const isMobile = window.matchMedia('(max-width: 768px)').matches;
                if (isMobile) {
                    y.position = 'relative';
                    y.left = '3em';
                    y.wordWrap = 'break-word';
                    y.maxWidth = '280px'; 
                    y.marginLeft ='10px';
                } else {
                    y.position = 'relative';
                    y.left = '24em';
                }
            }
            applyStyles();
            window.addEventListener('resize', applyStyles);

            //user profile  
            let userProfile = document.createElement('img');
            userProfile.src = '/assets/userpfp.png';
            userProfile.alt = 'User Profile Image'; 
            userProfile.class = 'user-profile';
            userProfile.style.height = '40px';
            let pfpContainer = document.createElement('div');
            pfpContainer.appendChild(userProfile);
            pfpContainer.appendChild(username);
            pfpContainer.id = 'pfp-container';

            //ai profile
            let ai = 'Vance';
            let aiName = document.createElement('h6');
            aiName.textContent = ai;
            let aiPFP = document.createElement('img');
            aiPFP.src = '/assets/vance-logo.png';
            aiPFP.class = 'aiPFP';
            aiPFP.style.height= '50px';
            let aiProfile = document.createElement('div');
            aiProfile.appendChild(aiPFP);
            aiProfile.appendChild(aiName);
            aiProfile.id = 'ai-pfp-container';
            
            newDiv.appendChild(pfpContainer);
            newDiv.appendChild(bubble);
            document.body.appendChild(newDiv);
            image.style.display = 'none';
            image.style.transition = 'display ease 5s';

            const openaiApiKey = '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';// API

            async function sendMessage() {
                console.log('Generating Response.')
                const query = document.querySelector('.prompt').value.trim();

                try {
                    const response = await fetch('https://api.openai.com/v1/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${openaiApiKey}`
                        },
                        body: JSON.stringify({
                            model: 'davinci-002',
                            prompt: query,
                            temperature: 0.5,
                            max_tokens: 500,
                            top_p: 0.5,
                            frequency_penalty: 0.5,
                            presence_penalty: 0.2,
                        }) 
                    });
                    const responseData = await response.json();
                    const assistantResponse = responseData.choices[0].text;
                        let aiBubble = document.createElement('h3');
                        let aiTextNode = document.createTextNode(assistantResponse);
                        let z = aiBubble.style;
                        z.maxWidth = '700px';
                        z.wordWrap = 'break-word'; 
                        z.border = 'none';
                        z.fontWeight = 'normal'
                        z.fontSize = '16px'
                        z.padding = '10px';
                        z.lineHeight = '1.8';
                        z.textAlign = 'justify'
                        aiBubble.appendChild(aiProfile);
                        aiBubble.appendChild(aiTextNode);
                        newDiv.appendChild(aiBubble);
                    

                } catch (error) {
                    console.error(error);
                    document.getElementById('output').innerText = "An error occurred while processing your request. Please try again later.";
                }
            } 
            //CALL THE FUNCTION
            sendMessage();
            newDiv.style.marginBottom = '60px'
            document.querySelector('.prompt').value = "";
    });
    let darkMode = document.querySelector('.dark-mode');
    let dark = false;
    
    darkMode.addEventListener('click', function(event) {
        event.preventDefault();
        dark = !dark; // Toggle dark mode state
    
        if (dark) {
            document.querySelector('html').style.filter = 'invert(1)';
            console.log('Dark mode activated');
        } else {
            // Return to normal mode
            document.querySelector('html').style.filter = 'invert(0)';
            console.log('Normal mode activated');
        }
    });

    let aboutAlert = document.querySelector('.about');
    aboutAlert.addEventListener('click', (event)=>{
        event.preventDefault();
        let ok = confirm('By proceeding, the entire conversation will be deleted. Do you want to continue?')
        if(ok){
            window.location.href = 'about.html';
        }
        else {
        }
    })
  });