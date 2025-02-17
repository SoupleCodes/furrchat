import { createPost } from './post.js';
import MarkdownIt from 'markdown-it';

let ws = null;
let replies = []
let replies_details = document.getElementById('replies_details');
let user

if (!localStorage.getItem('token')) { window.location.hash = '#login' }
function clearReplies() { replies = [], replies_details.innerHTML = `` }

function connectToWebSocket(u, p) {
    ws = new WebSocket('wss://sokt.fraudulent.loan/');
    ws.onopen = () => {
        ws.send(JSON.stringify({
            command: 'login_pswd',
            username: u,
            password: p,
            client: 'DeerChat'
        }));
    };

    ws.onmessage = (e) => {
        try {
            const r = JSON.parse(e.data);
            if (r.listener === 'RegisterLoginPswdListener' && !r.error) {
                localStorage.setItem('token', r.token);
                const d = JSON.parse(localStorage.getItem('userData')) || {};
                if (d[r.user.username]) { d[r.user.username].token = r.token; }
                localStorage.setItem('userData', JSON.stringify(d));
            } else if (r.command === 'greet') {
                handlePosts(r.messages)
                r.ulist && console.log('Received user list:', r.ulist);
            } else if (r.command === 'new_post') {
                handleNewPost(r.data);
            } else if (r.command === 'ulist') {
                console.log('Received user list:', r.ulist);
            } else if (r.error) {
                console.error('Error:', r);
            } else {
                console.log(r);
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    };

    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = (e) => console.log('WebSocket connection closed:', e);
    return ws;
}

function getUserCredentials() {
    const d = JSON.parse(localStorage.getItem('userData')) || {};
    const u = Object.keys(d);
    return u.length ? { username: u[0], password: d[u[0]].password } : null;
}

function handlePosts(posts) {
    console.log(posts)
    const postsContainer = document.getElementById('post-container');
    posts.forEach(post => {
        const postHtml = createPost(post);
        postsContainer.innerHTML += postHtml;
    });
}

function handleNewPost(post) {
    const postsContainer = document.getElementById('post-container');
    const postHtml = createPost(post);
    postsContainer.innerHTML = postHtml + postsContainer.innerHTML;
}

const u = getUserCredentials();
if (u) {
    if (!ws) {
        connectToWebSocket(u.username, u.password);
    }
} else {
    console.error('User data not found in localStorage.');
}

function sendPost() {
    let message = document.getElementById("commentbox");
    if (ws && ws.readyState === WebSocket.OPEN) {
        const postCommand = JSON.stringify({
            command: "post",
            content: message.value,
            replies: replies,
            attachments: [],
        });
        console.log("Sending post command:", postCommand);
        ws.send(postCommand);
        message.value = "";
        clearReplies();
    } else {
        console.error("WebSocket connection is not open.");
    }
}

function showPageFromHash() {
    const hash = window.location.hash
    const hashParts = hash.split('?');
    const pageId = hashParts[0].substring(1) || "home";
    const query = hashParts[1];
    const allPages = document.querySelectorAll(".page");
    allPages.forEach(page => page.classList.remove("active"));
    const pageToShow = document.getElementById(`${pageId}-page`);
    if (pageToShow) {
        pageToShow.classList.add("active");
        switch (pageId) {
            case "profile":
                loadProfilePage(query);
                break;
            case "home":
                loadHomePage();
                break;
            case "login":
                break;
        }
    }
    else {
        document.getElementById('not-found-page').classList.add('active');
    }
}

window.addEventListener("hashchange", showPageFromHash);
showPageFromHash();

const contentDiv = document.getElementById("content");
contentDiv.addEventListener("click", (event) => {
    if (event.target.matches(".profile-link")) {
        event.preventDefault();
        const url = event.target.getAttribute("href");
        const username = new URLSearchParams(url.split('?')[1]).get('user');
        window.location.hash = `#profile?user=${username}`;
    } else if (event.target.matches(".reply-link")) {
        event.preventDefault();
        const postId = Number(event.target.getAttribute('post_id'));
        replies.push(postId);

        replies_details.innerHTML = `${replies.length} Replies - <span class="link" id="clear-replies">Remove All</span>`;
        const removeAll = document.getElementById("clear-replies");
        if (removeAll) {
            removeAll.addEventListener("click", clearReplies);
        }
    } else if (event.target.matches("#clear-replies")) {
        clearReplies();
    }
});

function loadHomePage() {
    const sendButton = document.getElementById("send-button");
    if (sendButton) { sendButton.addEventListener("click", sendPost) }
}

function loadProfilePage(query) {
    if (!query) return;
    const username = new URLSearchParams(query).get('user');
    if (!username) return;

    const contentDiv = document.getElementById("profile-page");
    if (!contentDiv) { console.error("Could not find profile-page"); return }

    const handleUserData = (userData) => {
        user = userData;
        const md = MarkdownIt();
        const mdBio = md.render(user.bio);
        const userPermissions = user.permissions.map(permission => permission).join(', ');
        console.log(user);

        const contentDiv = document.getElementById("profile-page");
        if (!contentDiv) { console.error("Could not find profile-page"); return }
        contentDiv.innerHTML = `
        <div style="display: flex">
            <div id="profile-pic">
                <img src="${user.avatar}"/>
            </div>
            <div style="width: 100%">
                <h1>${user.display_name}</h1>
                <small>@${user.username}</small>
                <p>Joined: ${new Date(user.created * 1000).toLocaleString()}</p>
                <p>Permissions: ${userPermissions}</p>
                <hr>
                <p>${mdBio}</p>
            </div>
        </div>
      `;
    };

    const sendGetUserCommand = () => {
        ws.send(JSON.stringify({ command: "get_user", username }));
        ws.onmessage = (e) => {
            const parsedData = JSON.parse(e.data);
            if (parsedData.user) {
                handleUserData(parsedData.user);
            }
            ws.onmessage = null;
        };
    };

    const waitForWebSocket = () => {
        if (ws?.readyState === WebSocket.OPEN) {
            console.log("WebSocket is now open.");
            sendGetUserCommand();
        } else {
            console.log("WebSocket not open, waiting for connection...");
            setTimeout(waitForWebSocket, 100);
        }
    };

    if (ws?.readyState === WebSocket.OPEN) {
        sendGetUserCommand();
    } else {
        waitForWebSocket();
    }
}