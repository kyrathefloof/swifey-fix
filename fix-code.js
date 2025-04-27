/*
 * Copyright (c) 2025 CloudAPI.one authors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * modify, distribute, and use the Software, subject to the following conditions:
 *
 * 1. The above copyright notice and this permission notice shall be included
 *    in all copies or substantial portions of the Software.
 * 2. The Software, or any derivative works, may not be sold, licensed, or otherwise
 *    used for any form of direct or indirect monetary gain.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * PLEASE USE CAUTION WHEN PASTING ANY SCRIPT INTO CONSOLE. BY DOING SO YOU ASSUME ANY AND ALL LIABILITY.
 * PLEASE READ THE FOLLOWING CODE TO ENSURE NO MALICIOUS CODE WAS EDITED INTO IT
 * THE OFFICAL COPY OF THIS CODE IS FROM https://github.com/kyrathefloof/swifey-fix
 * IF THIS IS NOT THE SOURCE YOU OBTAINED THIS CODE FROM, PLEASE ENSURE THE CODE MATCHES THIS CODE CLOSELY
 * IF YOU HAVE ANY DOUBTS, DO NOT PASTE.
 * 
 * REMOVAL OF THIS NOTICE VIOLATES THIS SOFTWARE LICENSE AND COULD RESULT IN ANY DISTRIBUTOR TO BE LIABLE FOR ANY DAMAGE THEY CAUSED
 * THIS NOTICE MAY BE REMOVED BY THE END USER AS LONG AS THEY DO NOT SHARE ANY COPY OF THIS CODE WITHOUT THIS NOTICE
 * THE COPYRIGHT, CONDITIONS, AND SOFTWARE LICENSE AGREEMENT SHOULD BE KEPT WHERE APPLICABLE BY LAW
 */
// Written by KyraTheFloof
// meow i "hacked" this bc they being shitty advertising a shitty dating app.

// create controls owo
// overwrite app store apps

let appStoreOverwriteDiv = document.getElementsByClassName("app-stores")[0];
// remove download buttons
for (let i = appStoreOverwriteDiv.children.length - 1; i >= 0; i--) {
    appStoreOverwriteDiv.children[i].remove();
}

// thank god thats better
// lets fix the stupid annoying "btw u should check out our dating app" like stfu.
// oh its called plug.. yk im not even gonna make a joke abt that actually

document.getElementsByClassName("plug")[0].remove();

// kids, please DONT use dating apps. thanks.

// now lets build out controls :3

let container = document.createElement("div");
// give container some style :3
container.style = "display: flex; flex-direction: column; padding: 5px;  border-radius: 15px; background-color: #123a54; min-width: 350px; min-height: 200px";
let textP = document.createElement("p");
textP.innerText = "This app does NOT do any sort of processing what so ever to figure out your country. It was made to advertise a shitty dating app via word-of-mouth advertising. This script aims to modify the page to remove the advertisement portion entirely and bypass an unnecessary waste of time \"loading\" animations"
let countryControlsContainer = document.createElement("div");
countryControlsContainer.style = "display: flex; flex-direction: column; padding: 5px; border-radius: 15px; background-color: #0a1f2d; min-height: 100%";
let countryInput = document.createElement("input");
countryInput.id = "countryInput"; //
countryInput.placeholder = "Input any text you want here to be randomly selected once you press \"find out\""
countryInput.style = "border-radius: 15px;padding: 15px;background-color: #081a26;border-width: 0px;color: white; margin-bottom: 15px"
let countrySubmitButton = document.createElement("button");
countrySubmitButton.id = "csb";
countrySubmitButton.textContent = "Add Country"; // add button text!

countrySubmitButton.onclick = addToCountryArray; // assign function, not string

// ok now we build and add.

countryControlsContainer.appendChild(countryInput);
countryControlsContainer.appendChild(textP)
countryControlsContainer.appendChild(countrySubmitButton);

container.appendChild(countryControlsContainer);

appStoreOverwriteDiv.appendChild(container);

// ok now we bypass the unnecessary loading times, its not "loading" anything its just lying. 

let countryArray = []
function addToCountryArray() {
    let valueOfInput = document.getElementById("countryInput").value
    if(valueOfInput == ""){ 
        changeButtonValue("You need to input something furst...") 
        return
    }
    countryArray.push(valueOfInput)
    changeButtonValue()
  
}

function changeButtonValue(val = "✔ Added ^w^"){
let findNewCountrySubmitButton = document.getElementById("csb")
    findNewCountrySubmitButton.textContent = val
       setTimeout(function(){
           findNewCountrySubmitButton.textContent = "Add Country"
       }, 1500)
}
getCountryForUsername = function(username) {
    let index = Math.floor(Math.random() * countryArray.length)
    return countryArray[index]
}
cycleCountryEmojis = function(){
    const input = "nothing"
    const country = getCountryForUsername(input);
    const emoji = countryEmojis[country] || "";
    
    // Hide loading and show result
    
    // Create beautiful result
    result.innerHTML = `
        <div class="emoji">${emoji}</div>
        <div>Your soulmate is in</div>
        <div class="country-name">${country}</div>
    `;
    result.style.display = "block";
    return false;
}


// overwriting open with twitter and share with twitter. just screenshot the page if you wanna share or remove this, i wont judge.
// your tweet doesnt need to spread this page lol

shareOnTwitter = async function() {
    try {
        const shareTemplate = document.getElementById("share-template");
        const shareResultText = document.getElementById("share-result-text");
        const result = document.getElementById("result");
        const username = document.getElementById("username").value.toLowerCase().trim();
        const country = getCountryForUsername(username);
        
        // Set the result text
        shareResultText.textContent = `Your soulmate is in ${country}`;
        
        // Show template for canvas generation
        shareTemplate.style.display = "block";
        shareTemplate.style.position = "fixed";
        shareTemplate.style.left = "-9999px";
        shareTemplate.style.top = "-9999px";
        
        const canvas = await html2canvas(shareTemplate, {
            backgroundColor: null,
            scale: 2,
            logging: false,
            useCORS: true
        });
        
        shareTemplate.style.display = "none";

        const tweetText = `I got ${country}!!. Minors, please do not use dating apps. Modify your own country result at https://github.com/kyrathefloof/swifey-fix`;
        
          const instructions = document.createElement('div');
        instructions.className = 'share-instructions';
        instructions.innerHTML = `
            <div class="share-overlay">
                <div class="share-message">
                    <button class="share-twitter-btn" data-tweet="${encodeURIComponent(tweetText)}">Continue to Twitter 🐦</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(instructions);
        const shareButton = instructions.querySelector('.share-twitter-btn');
        if (shareButton) {
            shareButton.addEventListener('click', function() {
                const tweetText = this.getAttribute('data-tweet');
                openTwitterShare(tweetText, this);
            });
        }

        // Add click event to copy image on mobile
        const previewImage = instructions.querySelector('.result-preview');
        if (previewImage) {
            previewImage.addEventListener('click', async function() {
                try {
                   
                } catch (err) {
                }
            });
        }

    } catch (error) {
        console.error('Error sharing:', error);
    }
}

